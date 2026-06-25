import { ConsumerService } from "../services/kafka/consumer.service.js";
import { observabilityEventRepository } from "../repositories/observability-event.repository.js";
import { logger } from "../config/logger.js";
import { normalizeDeployment } from "../services/normalizers/deployment.normalizer.js";

export async function startObservabilityConsumer(topic: string, groupId: string) {

  const consumer = new ConsumerService(groupId);

  await consumer.connect();

  await consumer.subscribe(topic);

  await consumer.run(async (message: string) => {
    try {
      const payload = JSON.parse(message);

      await observabilityEventRepository.create(payload);

      logger.info(`Stored event from topic ${topic}`);

    } catch (error) {
      logger.error({ topic, error, });
    }
  });
}