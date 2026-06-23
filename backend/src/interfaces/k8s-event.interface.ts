export interface K8sEvent {
    timestamp: Date;

    source: "kubernetes";

    cluster?: string;

    namespace?: string;

    kind?: string;

    resourceName?: string;

    reason: string;

    message: string;

    type?: string;

    severity:
    | "INFO"
    | "WARN"
    | "ERROR"
    | "CRITICAL";

    metadata?: Record<string, unknown>;
}