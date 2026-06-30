import { MetricEvent } from '../../interfaces/metric.interface.js';

export function normalizePrometheusMetric(
  metricName: string,
  result: any
): MetricEvent[] {
  return result.map((item: any) => ({
    timestamp: new Date(Number(item.value?.[0]) * 1000),

    source: 'prometheus',

    metricName,

    pod: item.metric?.pod,
    namespace: item.metric?.namespace,
    service: item.metric?.service,

    value: Number(item.value?.[1]),

    labels: item.metric ?? {},

    metadata: {
      raw: item,
    },
  }));
}