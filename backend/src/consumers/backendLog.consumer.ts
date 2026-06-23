import { ConsumerService } from "../services/kafka/consumer.service.js";
import { TOPICS } from "../services/kafka/topics.js";
import { logger } from "../config/logger.js";
import { logRepository } from "../repositories/log.repository.js";
import { normalizeBackendLog } from '../services/normalizers/backend_normalizer.ts'

const consumer = new ConsumerService(
    "backend-log-group"
);

export async function startBackendLogConsumer() {
    await consumer.connect();

    await consumer.subscribe(
        TOPICS.BACKEND_LOGS
    );

    await consumer.run(async (message) => {
        try {

            const payload = JSON.parse(message);

            const normalized = normalizeBackendLog(payload);

            await logRepository.create(normalized);

            logger.info(
                "Backend log stored in MongoDB"
            );

        } catch (error) {
            logger.error(error);
        }
    });
}