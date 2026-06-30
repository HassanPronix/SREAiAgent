import { MetricEvent } from '../../interfaces/metric.interface.js';

type AnomalyRule = {
  threshold: number;
  severity: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
};

const RULES: Record<string, AnomalyRule> = {
  cpu_usage: {
    threshold: 0.8,
    severity: 'CRITICAL',
  },
  memory_usage: {
    threshold: 0.85,
    severity: 'CRITICAL',
  },
  pod_restarts: {
    threshold: 3,
    severity: 'WARN',
  },
};

export function detectAnomaly(metric: MetricEvent): MetricEvent | null {
  const rule = RULES[metric.metricName];

  // No rule defined for this metric
  if (!rule) {
    return null;
  }

  // Ensure value is valid number
  const value = Number(metric.value);

  if (Number.isNaN(value)) {
    return null;
  }

  if (value > rule.threshold) {
    return {
      ...metric,
      severity: rule.severity,
    };
  }

  return null;
}