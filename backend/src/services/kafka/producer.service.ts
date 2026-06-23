import { Producer } from "kafkajs";
import { kafka } from "../../config/kafka.js";
import { logger } from "../../config/logger.js";

class ProducerService {
  private producer: Producer;

  constructor() {
    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();

    logger.info("Kafka producer connected");
  }

  async disconnect() {
    await this.producer.disconnect();

    logger.info("Kafka producer disconnected");
  }

  async publish(
    topic: string,
    payload: unknown
  ) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });
  }
}

export const producerService =
  new ProducerService();