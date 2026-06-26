export interface LogEvent {
  timestamp: Date;

  source: 'backend' | 'fluentbit' | 'kubernetes' | 'prometheus' | 'incident';

  severity: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';

  cluster?: string;

  namespace?: string;

  pod?: string;

  container?: string;

  service?: string;

  traceId?: string;

  requestId?: string;

  message: string;

  metadata?: Record<string, unknown>;
}
