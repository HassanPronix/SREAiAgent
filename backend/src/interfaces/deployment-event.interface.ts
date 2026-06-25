export interface DeploymentEvent {
  timestamp: Date;

  source: "kubernetes";

  namespace?: string;

  deploymentName: string;

  replicas?: number;

  availableReplicas?: number;

  readyReplicas?: number;

  image?: string;

  generation?: number;

  phase: string;

  metadata?: Record<string, unknown>;
}