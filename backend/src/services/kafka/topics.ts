export const TOPICS = {
  BACKEND_LOGS: 'backend-logs',
  RAW_LOGS: 'raw-logs',

  METRICS: 'metrics',
  METRIC_ANOMALIES: 'metric-anomalies',

  K8S_EVENTS: 'k8s-events',
  DEPLOYMENT_EVENTS: 'deployment-events',
  POD_EVENTS: 'pod-events',
  NODE_EVENTS: 'node-events',

  INCIDENTS: 'incidents',
  RECOMMENDATIONS: 'recommendations',
} as const;
