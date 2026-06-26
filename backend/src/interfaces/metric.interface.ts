export interface MetricEvent {
  timestamp: Date;

  source: 'prometheus';

  metricName: string;

  cluster?: string;

  namespace?: string;

  pod?: string;

  service?: string;

  value: number;

  unit?: string;

  severity?: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';

  labels?: Record<string, string>;

  metadata?: Record<string, unknown>;
}
