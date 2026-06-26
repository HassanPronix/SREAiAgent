import { ConsumerService } from "../services/kafka/consumer.service.js";
import { TOPICS } from "../services/kafka/topics.js";
import { logger } from "../config/logger.js";
import { logRepository } from "../repositories/log.repository.js";
import { normalizeBackendLog } from "../services/normalizers/backend_normalizer.js";


const consumer = new ConsumerService(
    "backend-log-group"
);


export async function startBackendLogConsumer() {

    try {

        await consumer.connect();


        logger.info(
            {
                service: "kafka-consumer",
                topic: TOPICS.BACKEND_LOGS,
                groupId: "backend-log-group"
            },
            "Kafka consumer connected"
        );


        await consumer.subscribe(
            [TOPICS.BACKEND_LOGS]
        );


        logger.info(
            {
                topic: TOPICS.BACKEND_LOGS
            },
            "Subscribed to backend logs topic"
        );


        await consumer.run(async (_, message) => {

            const receivedAt = new Date();


            try {

                const payload = JSON.parse(message);


                logger.debug(
                    {
                        topic: TOPICS.BACKEND_LOGS,
                        messageSize: JSON.stringify(payload).length
                    },
                    "Backend log message received"
                );


                const normalized = normalizeBackendLog(payload);



                await logRepository.create(normalized);



                logger.info(
                    {
                        topic: TOPICS.BACKEND_LOGS,

                        service: normalized.service || "unknown",

                        severity: normalized.severity || "unknown",

                    },
                    "Backend log stored in MongoDB"
                );


            } catch (error) {


                logger.error(
                    {
                        err: error,

                        service: "kafka-consumer",

                        component: "backend-log-consumer",

                        incidentType: "BACKEND_LOG_PROCESSING_FAILURE",

                        metadata: {
                            topic: TOPICS.BACKEND_LOGS,
                            receivedAt
                        }
                    },

                    "Failed to process backend log message"
                );

            }

        });


    } catch (error) {


        logger.fatal(
            {
                err: error,

                service: "kafka-consumer",

                component: "backend-log-consumer",

                incidentType: "KAFKA_CONSUMER_START_FAILURE",

                metadata: {
                    groupId: "backend-log-group",
                    topic: TOPICS.BACKEND_LOGS
                }
            },

            "Kafka consumer failed to start"
        );


        process.exit(1);
    }
}