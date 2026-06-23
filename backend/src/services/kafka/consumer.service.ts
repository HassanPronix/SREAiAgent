import { Consumer } from "kafkajs";
import { kafka } from "../../config/kafka.js";
import { logger } from "../../config/logger.js";

export class ConsumerService {
  private consumer: Consumer;

  constructor(groupId: string) {
    this.consumer = kafka.consumer({
      groupId,
    });
  }

  async connect() {
    await this.consumer.connect();

    logger.info("Kafka consumer connected");
  }

  async subscribe(topic: string) {
    await this.consumer.subscribe({
      topic,
      fromBeginning: true,
    });
  }

  async run(
    handler: (message: string) => Promise<void>
  ) {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        await handler(
          message.value.toString()
        );
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}