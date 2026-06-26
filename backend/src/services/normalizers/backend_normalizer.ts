import { LogEvent } from '../../interfaces/log-event.interface.js';

export function normalizeBackendLog(payload: any): LogEvent {
  return {
    timestamp: new Date(payload.timestamp),

    source: 'backend',

    severity: payload.statusCode >= 500 ? 'ERROR' : 'INFO',

    service: payload.service,

    requestId: payload.requestId,

    traceId: payload.traceId,

    message: `${payload.method} ${payload.path}`,

    metadata: {
      method: payload.method,
      path: payload.path,
      statusCode: payload.statusCode,
      duration: payload.duration,
    },
  };
}
