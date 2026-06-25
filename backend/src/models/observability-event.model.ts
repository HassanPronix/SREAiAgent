import { Schema, model } from "mongoose";

const ObservabilityEventSchema = new Schema(
    {
        timestamp: {
            type: Date,
            required: true,
            index: true,
        },

        source: {
            type: String,
            required: true,
            enum: [
                "backend",
                "fluentbit",
                "prometheus",
                "kubernetes",
                "system",
            ],
            index: true,
        },

        eventType: {
            type: String,
            required: true,
            enum: [
                "log",
                "metric_anomaly",
                "k8s_event",
                "pod_event",
                "deployment_event",
                "node_event",
                "incident",
            ],
            index: true,
        },

        severity: {
            type: String,
            required: true,
            enum: ["INFO", "WARN", "ERROR", "CRITICAL"],
            default: "INFO",
            index: true,
        },

        cluster: String,

        namespace: {
            type: String,
            index: true,
        },

        service: {
            type: String,
            index: true,
        },

        pod: {
            type: String,
            index: true,
        },

        node: {
            type: String,
            index: true,
        },

        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        labels: {
            type: Schema.Types.Mixed,
            default: {},
        },

        metadata: {
            type: Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// Compound indexes for correlation queries
ObservabilityEventSchema.index({
    namespace: 1,
    timestamp: -1,
});

ObservabilityEventSchema.index({
    service: 1,
    timestamp: -1,
});

ObservabilityEventSchema.index({
    pod: 1,
    timestamp: -1,
});

ObservabilityEventSchema.index({
    severity: 1,
    timestamp: -1,
});

// Automatically delete events older than 30 days
ObservabilityEventSchema.index(
    { createdAt: 1 },
    {
        expireAfterSeconds: 60 * 60 * 24 * 30,
    }
);

export const ObservabilityEventModel = model(
    "ObservabilityEvent",
    ObservabilityEventSchema
);