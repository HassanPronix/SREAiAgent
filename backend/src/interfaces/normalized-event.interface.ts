export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface NormalizedEvent {
  source: string;
  timestamp: Date;
  severity: Severity;

  namespace?: string;

  resourceType: string;
  resourceName: string;

  message: string;

  rawData: any;
}
