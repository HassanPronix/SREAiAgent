import { ConsumerService } from '../services/kafka/consumer.service.js';
import { observabilityEventRepository } from '../repositories/observability-event.repository.js';
import { logger } from '../config/logger.js';

export async function startObservabilityConsumer(topic: string, groupId: string) {
  const consumer = new ConsumerService(groupId);

  try {
    await consumer.connect();

    logger.info(
      {
        service: 'observability-consumer',
        topic,
        groupId,
      },
      'Observability consumer connected',
    );

    await consumer.subscribe([topic]);

    logger.info(
      {
        topic,
        groupId,
      },
      'Subscribed to observability topic',
    );

    await consumer.run(async (_, message: string) => {
      const receivedAt = new Date();

      try {
        const payload = JSON.parse(message);

        logger.debug(
          {
            topic,

            eventType: payload.type || payload.reason || payload.kind || 'unknown',

            receivedAt,
          },

          'Observability event received',
        );

        await observabilityEventRepository.create(payload);

        logger.info(
          {
            topic,

            eventType: payload.type || payload.reason || payload.kind || 'unknown',

            stored: true,
          },

          'Observability event stored',
        );
      } catch (error) {
        logger.error(
          {
            err: error,

            service: 'observability-consumer',

            component: 'event-ingestion',

            incidentType: 'OBSERVABILITY_EVENT_PROCESSING_FAILURE',

            metadata: {
              topic,
              groupId,
              receivedAt,
            },
          },

          'Failed to process observability event',
        );
      }
    });
  } catch (error) {
    logger.fatal(
      {
        err: error,

        service: 'observability-consumer',

        component: 'event-ingestion',

        incidentType: 'OBSERVABILITY_CONSUMER_START_FAILURE',

        metadata: {
          topic,
          groupId,
        },
      },

      'Observability consumer failed to start',
    );

    process.exit(1);
  }
}
