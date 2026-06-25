export interface PodEvent {
  timestamp: Date;

  source: "kubernetes";

  namespace?: string;

  podName: string;

  nodeName?: string;

  phase: string;

  restartCount: number;

  ready: boolean;

  podIP?: string;

  hostIP?: string;

  status: string;

  metadata?: Record<string, unknown>;
}