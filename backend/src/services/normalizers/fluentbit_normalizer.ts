import { LogEvent } from '../../interfaces/log-event.interface.js';

export function normalizeFluentBitLog(payload: any): LogEvent {
  return {
    timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),

    source: 'fluentbit',

    severity: 'INFO',

    message: payload.log || 'Unknown log',

    metadata: payload,
  };
}
