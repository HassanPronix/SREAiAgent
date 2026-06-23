import app from "./app.js";
import { logger } from "./config/logger.js";
import { producerService } from "./services/kafka/producer.service.js";
import { connectDB } from "./config/database.js";
import { startBackendLogConsumer } from "./consumers/backendLog.consumer.js";
import { startRawLogConsumer }from "./consumers/rawLog.consumer.js";
import { startMetricConsumer }from "./consumers/metric.consumer.ts";


const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {

    await connectDB();

    await producerService.connect();

    await startBackendLogConsumer();
    await startRawLogConsumer();
    await startMetricConsumer();

    const server = app.listen(PORT, () => {
      logger.info(`Server running on ${PORT}`);
    });

    process.on("SIGINT", async () => {
      logger.info("Shutting down");

      await producerService.disconnect();

      server.close(() => {
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
}

bootstrap();