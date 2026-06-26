import app from './app.js';
import { logger } from './config/logger.js';
import { producerService } from './services/kafka/producer.service.js';
import { connectDB } from './config/database.js';
import { startBackendLogConsumer } from './consumers/backendLog.consumer.js';
import { startRawLogConsumer } from './consumers/rawLog.consumer.js';
import { startMetricConsumer } from './consumers/metric.consumer.js';
import { startMetricsCollector } from './services/prometheus/metrics.scheduler.js';
import { startObservabilityConsumer } from './consumers/startObservabilityConsumer.js';
import { TOPICS } from './services/kafka/topics.js';
import { startWatchers } from './services/kubernetes/watchers.service.js';
import { startIncidentConsumer } from './consumers/incident.consumer.js';
import { initializeVectorStore } from './services/qdrant/vector-store.service.js';

const PORT = Number(process.env.PORT) || 5000;

async function bootstrap() {
  try {
    await connectDB();

    await producerService.connect();

    await initializeVectorStore();

    await startBackendLogConsumer();
    await startRawLogConsumer();

    // uncomment these two line for metrics
    await startMetricConsumer();
    startMetricsCollector();

    // K8s event, deployment, pod watcher and consumer

    // uncomment below code for k8s observability
    // startWatchers()

    // await startObservabilityConsumer(TOPICS.K8S_EVENTS, "k8s-event-group");
    // await startObservabilityConsumer(TOPICS.POD_EVENTS, "pod-event-group");
    // await startObservabilityConsumer(TOPICS.DEPLOYMENT_EVENTS, "deployment-event-group");
    // await startObservabilityConsumer(TOPICS.NODE_EVENTS, "node-event-group");

    startIncidentConsumer();

    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server running on ${PORT}`);
    });

    process.on('SIGINT', async () => {
      logger.info('Shutting down');

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
