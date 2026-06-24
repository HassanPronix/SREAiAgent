import app from "./app.js";
import { logger } from "./config/logger.js";
import { producerService } from "./services/kafka/producer.service.js";
import { connectDB } from "./config/database.js";
import { startBackendLogConsumer } from "./consumers/backendLog.consumer.js";
import { startRawLogConsumer } from "./consumers/rawLog.consumer.js";
import { startMetricConsumer } from "./consumers/metric.consumer.js";
import { startMetricsCollector } from "./services/prometheus/metrics.scheduler.js";
import { startK8sEventConsumer } from "./consumers/k8s-event.consumer.js";
import { startEventWatcher } from "./services/kubernetes/event-watcher.service.js";


const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {

    await connectDB();

    await producerService.connect();

    await startBackendLogConsumer();
    await startRawLogConsumer();

    // uncomment these two line for metrics 
    startMetricsCollector()    
    await startMetricConsumer();

    await startK8sEventConsumer();
    startEventWatcher();

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