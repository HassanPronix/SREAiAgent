import { ConsumerService } from '../services/kafka/consumer.service.js';
import { TOPICS } from '../services/kafka/topics.js';
import { logger } from '../config/logger.js';
import { logRepository } from '../repositories/log.repository.js';
import { normalizeBackendLog } from '../services/normalizers/backend_normalizer.js';

const consumer = new ConsumerService('backend-log-group');

export async function startBackendLogConsumer() {
    try {
        await consumer.connect();

        console.log('backend log -->')
        logger.info(
            {
                event: 'kafka_consumer_connected',

                metadata: {
                    component: 'backend-log-consumer',
                    topic: TOPICS.BACKEND_LOGS,
                    groupId: 'backend-log-group',
                },
            },

            'Kafka consumer connected',
        );

        await consumer.subscribe([TOPICS.BACKEND_LOGS]);

        logger.info(
            {
                event: 'kafka_topic_subscribed',

                metadata: {
                    topic: TOPICS.BACKEND_LOGS,
                },
            },

            'Subscribed to backend logs topic',
        );

        await consumer.run(async (_, message) => {
            const receivedAt = new Date();
        console.log('backend log -->', message)

            try {
                const payload = JSON.parse(message);

                logger.debug(
                    {
                        event: 'backend_log_received',

                        metadata: {
                            topic: TOPICS.BACKEND_LOGS,
                            messageSize: JSON.stringify(payload).length,
                        },
                    },

                    'Backend log message received',
                );

                const normalized = normalizeBackendLog(payload);

                await logRepository.create(normalized);

                logger.info(
                    {
                        event: 'backend_log_stored',

                        metadata: {
                            topic: TOPICS.BACKEND_LOGS,
                            service: normalized.service ?? 'unknown',
                            severity: normalized.severity ?? 'unknown',
                        },
                    },

                    'Backend log stored in MongoDB',
                );
            } catch (error) {
                logger.error(
                    {
                        event: 'backend_log_processing_failed',

                        err: error,

                        metadata: {
                            component: 'backend-log-consumer',
                            incidentType: 'BACKEND_LOG_PROCESSING_FAILURE',
                            topic: TOPICS.BACKEND_LOGS,
                            receivedAt,
                        },
                    },

                    'Failed to process backend log message',
                );
            }
        });
    } catch (error) {
        logger.fatal(
            {
                event: 'kafka_consumer_start_failed',

                err: error,

                metadata: {
                    component: 'backend-log-consumer',
                    incidentType: 'KAFKA_CONSUMER_START_FAILURE',
                    groupId: 'backend-log-group',
                    topic: TOPICS.BACKEND_LOGS,
                },
            },

            'Kafka consumer failed to start',
        );

        process.exit(1);
    }
}
