import { Consumer } from 'kafkajs';
import { kafka } from '../../config/kafka.js';
import { logger } from '../../config/logger.js';

export class ConsumerService {
  private consumer: Consumer;

  private groupId: string;

  constructor(groupId: string) {
    this.groupId = groupId;

    this.consumer = kafka.consumer({
      groupId,
    });
  }

  async connect() {
    try {
      await this.consumer.connect();

      logger.info(
        {
          event: 'kafka_consumer_connected',

          metadata: {
            component: 'kafka-consumer',
            groupId: this.groupId,
          },
        },

        'Kafka consumer connected',
      );
    } catch (error) {
      logger.fatal(
        {
          event: 'kafka_connect_failed',

          err: error,

          metadata: {
            component: 'kafka-consumer',

            incidentType: 'KAFKA_CONNECT_FAILURE',

            groupId: this.groupId,
          },
        },

        'Kafka consumer connection failed',
      );

      throw error;
    }
  }

  async subscribe(topics: string[]) {
    try {
      for (const topic of topics) {
        await this.consumer.subscribe({
          topic,
          fromBeginning: false,
        });

        logger.info(
          {
            event: 'kafka_topic_subscribed',

            metadata: {
              topic,

              groupId: this.groupId,
            },
          },

          'Kafka topic subscribed',
        );
      }
    } catch (error) {
      logger.error(
        {
          event: 'kafka_subscription_failed',

          err: error,

          metadata: {
            component: 'kafka-consumer',

            incidentType: 'KAFKA_SUBSCRIBE_FAILURE',

            topics,

            groupId: this.groupId,
          },
        },

        'Kafka subscription failed',
      );

      throw error;
    }
  }

  async run(handler: (topic: string, message: string) => Promise<void>) {
    try {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          if (!message.value) {
            logger.warn(
              {
                event: 'kafka_empty_message',

                metadata: {
                  topic,
                  partition,
                },
              },

              'Kafka message has empty value',
            );

            return;
          }

          try {
            await handler(topic, message.value.toString());
          } catch (error) {
            logger.error(
              {
                event: 'kafka_message_processing_failed',

                err: error,

                metadata: {
                  component: 'kafka-consumer',

                  incidentType: 'MESSAGE_PROCESSING_FAILURE',

                  topic,

                  partition,

                  offset: message.offset,

                  groupId: this.groupId,
                },
              },

              'Kafka message handler failed',
            );
          }
        },
      });

      logger.info(
        {
          event: 'kafka_consumer_running',

          metadata: {
            groupId: this.groupId,
          },
        },

        'Kafka consumer running',
      );
    } catch (error) {
      logger.fatal(
        {
          event: 'kafka_consumer_runtime_failed',

          err: error,

          metadata: {
            component: 'kafka-consumer',

            incidentType: 'KAFKA_CONSUMER_RUNTIME_FAILURE',

            groupId: this.groupId,
          },
        },

        'Kafka consumer crashed',
      );

      throw error;
    }
  }

  async disconnect() {
    try {
      await this.consumer.disconnect();

      logger.info(
        {
          event: 'kafka_consumer_disconnected',

          metadata: {
            groupId: this.groupId,
          },
        },

        'Kafka consumer disconnected',
      );
    } catch (error) {
      logger.error(
        {
          event: 'kafka_disconnect_failed',

          err: error,

          metadata: {
            component: 'kafka-consumer',

            incidentType: 'KAFKA_DISCONNECT_FAILURE',

            groupId: this.groupId,
          },
        },

        'Kafka disconnect failed',
      );

      throw error;
    }
  }
}
