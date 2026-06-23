import { Schema, model } from "mongoose";

const MetricSchema = new Schema(
    {
        timestamp: {
            type: Date,
            required: true
        },

        source: {
            type: String,
            default: "prometheus"
        },

        metricName: {
            type: String,
            required: true
        },

        pod: String,

        namespace: String,

        service: String,

        container: String,

        value: {
            type: Number,
            required: true
        },

        labels: {
            type: Schema.Types.Mixed,
            default: {}
        },

        metadata: {
            type: Schema.Types.Mixed
        }
    },
    {
        timestamps: true
    }
);

MetricSchema.index({ timestamp: -1 });
MetricSchema.index({ metricName: 1 });
MetricSchema.index({ pod: 1 });
MetricSchema.index({ service: 1 });

export const MetricModel = model(
    "Metric",
    MetricSchema
);