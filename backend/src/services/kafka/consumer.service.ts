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
          service: 'kafka-consumer',
          groupId: this.groupId,
        },
        'Kafka consumer connected',
      );
    } catch (error) {
      logger.fatal(
        {
          err: error,

          service: 'kafka-consumer',

          incidentType: 'KAFKA_CONNECT_FAILURE',

          metadata: {
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
            topic,

            groupId: this.groupId,
          },

          'Kafka topic subscribed',
        );
      }
    } catch (error) {
      logger.error(
        {
          err: error,

          service: 'kafka-consumer',

          incidentType: 'KAFKA_SUBSCRIBE_FAILURE',

          metadata: {
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
                topic,
                partition,
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
                err: error,

                service: 'kafka-consumer',

                incidentType: 'MESSAGE_PROCESSING_FAILURE',

                metadata: {
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
          groupId: this.groupId,
        },
        'Kafka consumer running',
      );
    } catch (error) {
      logger.fatal(
        {
          err: error,

          service: 'kafka-consumer',

          incidentType: 'KAFKA_CONSUMER_RUNTIME_FAILURE',

          metadata: {
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
          groupId: this.groupId,
        },

        'Kafka consumer disconnected',
      );
    } catch (error) {
      logger.error(
        {
          err: error,

          service: 'kafka-consumer',

          incidentType: 'KAFKA_DISCONNECT_FAILURE',

          metadata: {
            groupId: this.groupId,
          },
        },

        'Kafka disconnect failed',
      );

      throw error;
    }
  }
}
