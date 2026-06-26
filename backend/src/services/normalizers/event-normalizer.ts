import { NormalizedEvent } from '../../interfaces/normalized-event.interface.js';

export function normalizeEvent(topic: string, payload: any): NormalizedEvent {
  switch (topic) {
    case 'backend-logs':
      return {
        source: 'logs',

        timestamp: new Date(payload.timestamp || Date.now()),

        severity: payload.level === 'ERROR' ? 'CRITICAL' : 'INFO',

        resourceType: 'pod',

        resourceName: payload.kubernetes?.pod_name || 'unknown',

        namespace: payload.kubernetes?.namespace_name,

        message: payload.message,

        rawData: payload,
      };

    case 'pod-events':
      return {
        source: 'k8s',

        timestamp: new Date(),

        severity: payload.reason === 'CrashLoopBackOff' ? 'CRITICAL' : 'WARNING',

        resourceType: 'pod',

        resourceName: payload.pod,

        namespace: payload.namespace,

        message: payload.reason,

        rawData: payload,
      };

    case 'metric-anomalies':
      return {
        source: 'metrics',

        timestamp: new Date(),

        severity: payload.score > 0.9 ? 'CRITICAL' : 'WARNING',

        resourceType: 'service',

        resourceName: payload.service,

        namespace: payload.namespace,

        message: payload.description,

        rawData: payload,
      };

    default:
      return {
        source: topic,

        timestamp: new Date(),

        severity: 'INFO',

        resourceType: 'unknown',

        resourceName: 'unknown',

        message: 'Unknown event',

        rawData: payload,
      };
  }
}
