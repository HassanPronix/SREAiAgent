import { ConsumerService } from "../services/kafka/consumer.service.js";
import { TOPICS } from "../services/kafka/topics.js";
import { logger } from "../config/logger.js";
import { logRepository } from "../repositories/log.repository.js";
import { normalizeFluentBitLog } from "../services/normalizers/fluentbit_normalizer.js";

const consumer = new ConsumerService(
  "raw-log-group"
);

export async function startRawLogConsumer() {
  await consumer.connect();

  await consumer.subscribe(
    TOPICS.RAW_LOGS
  );

  await consumer.run(async (message) => {
    try {
      const payload = JSON.parse(message);

      const normalized = normalizeFluentBitLog(payload);

      await logRepository.create(normalized);

    } catch (error) {
      logger.error(error);
    }
  });
}