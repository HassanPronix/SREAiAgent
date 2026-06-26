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
  logger.info(
    { event: 'bootstrap_started', component: 'server', port: PORT },
    'Starting backend service',
  );

  try {
    await Promise.all([connectDB(), producerService.connect(), initializeVectorStore()]);

    // connect all kafka consumers
    await Promise.all([
      startIncidentConsumer(),

      startBackendLogConsumer(),
      startRawLogConsumer(),
      startMetricConsumer(),

      // startObservabilityConsumer(TOPICS.K8S_EVENTS, "k8s-event-group"),
      // startObservabilityConsumer(TOPICS.POD_EVENTS, "pod-event-group"),
      // startObservabilityConsumer(TOPICS.DEPLOYMENT_EVENTS, "deployment-event-group"),
      // startObservabilityConsumer(TOPICS.NODE_EVENTS, "node-event-group"),
    ]);

    startMetricsCollector();
    // Enable Kubernetes watchers when required
    // startWatchers();

    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(
        { event: 'server_started', component: 'http', port: PORT, host: '0.0.0.0' },
        'HTTP server running',
      );
    });

    process.on('SIGINT', async () => {
      logger.info({ event: 'shutdown_started', signal: 'SIGINT' }, 'Graceful shutdown initiated');

      await producerService.disconnect();

      logger.info(
        { event: 'kafka_disconnected', component: 'kafka' },
        'Kafka producer disconnected',
      );

      server.close(() => {
        logger.info({ event: 'server_stopped' }, 'HTTP server stopped');

        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(
      { event: 'bootstrap_failed', component: 'server', err: error },
      'Backend startup failed',
    );

    process.exit(1);
  }
}

bootstrap();
