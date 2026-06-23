import { ConsumerService } from "../services/kafka/consumer.service.js";
import { TOPICS } from "../services/kafka/topics.js";
import { MetricModel } from "../models/metric.model.js";
import { normalizePrometheusMetric } from "../services/normalizers/prometheus.normalizer.js";
import { detectAnomaly } from "../services/prometheus/anomaly.service.ts";
import { producerService } from "../services/kafka/producer.service.ts";
import { metricRepository } from "../repositories/metric.repository.ts";

const consumer = new ConsumerService("metric-group");

export async function startMetricConsumer() {

  await consumer.connect();

  await consumer.subscribe(
    TOPICS.METRICS
  );

  await consumer.run(async (message) => {

    const payload = JSON.parse(message);

    const normalizedMetrics = normalizePrometheusMetric(payload.metricName, payload.data);

    for (const metric of normalizedMetrics) {

      console.log('metric -->', metric)

      await metricRepository.create({ ...metric, timestamp: payload.timestamp });

      const anomaly = detectAnomaly(metric);

      if (anomaly) {

        await producerService.publish(
          TOPICS.METRIC_ANOMALIES,
          anomaly
        );
      }
    }
  });

}