import { ConsumerService } from '../services/kafka/consumer.service.js';
import { observabilityEventRepository } from '../repositories/observability-event.repository.js';
import { logger } from '../config/logger.js';

export async function startObservabilityConsumer(topic: string, groupId: string) {
  const consumer = new ConsumerService(groupId);

  try {
    await consumer.connect();

    logger.info(
      {
        event: 'observability_consumer_connected',

        metadata: {
          component: 'event-ingestion',
          topic,
          groupId,
        },
      },

      'Observability consumer connected',
    );

    await consumer.subscribe([topic]);

    logger.info(
      {
        event: 'observability_topic_subscribed',

        metadata: {
          topic,
          groupId,
        },
      },

      'Subscribed to observability topic',
    );

    await consumer.run(async (_, message: string) => {
      const receivedAt = new Date();

      try {
        const payload = JSON.parse(message);

        logger.debug(
          {
            event: 'observability_event_received',

            metadata: {
              topic,

              eventType: payload.type || payload.reason || payload.kind || 'unknown',

              receivedAt,
            },
          },

          'Observability event received',
        );

        await observabilityEventRepository.create(payload);

        logger.info(
          {
            event: 'observability_event_stored',

            metadata: {
              topic,

              eventType: payload.type || payload.reason || payload.kind || 'unknown',

              stored: true,
            },
          },

          'Observability event stored',
        );
      } catch (error) {
        logger.error(
          {
            event: 'observability_event_processing_failed',

            err: error,

            metadata: {
              component: 'event-ingestion',

              incidentType: 'OBSERVABILITY_EVENT_PROCESSING_FAILURE',

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
        event: 'observability_consumer_start_failed',

        err: error,

        metadata: {
          component: 'event-ingestion',

          incidentType: 'OBSERVABILITY_CONSUMER_START_FAILURE',

          topic,
          groupId,
        },
      },

      'Observability consumer failed to start',
    );

    process.exit(1);
  }
}
