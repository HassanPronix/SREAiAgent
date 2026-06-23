import app from "./app.js";
import { logger } from "./config/logger.js";
import { producerService } from "./services/kafka/producer.service.js";
import { connectDB } from "./config/database.js";
import { startBackendLogConsumer } from "./consumers/backendLog.consumer.js";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {

    await connectDB();

    await producerService.connect();

    await startBackendLogConsumer();

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