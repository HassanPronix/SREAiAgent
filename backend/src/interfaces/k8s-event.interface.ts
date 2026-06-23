export interface K8sEvent {
    timestamp: Date;

    cluster?: string;

    namespace?: string;

    kind?: string;

    name?: string;

    reason: string;

    message: string;

    type?: string;

    source: "kubernetes";

    severity:
    | "INFO"
    | "WARN"
    | "ERROR"
    | "CRITICAL";

    metadata?: Record<string, unknown>;
}