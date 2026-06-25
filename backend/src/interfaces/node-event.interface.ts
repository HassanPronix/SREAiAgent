export interface NodeEvent {
    timestamp: Date;

    source: "kubernetes";

    nodeName: string;

    ready: boolean;

    conditions: string[];

    metadata?: Record<string, unknown>;
}