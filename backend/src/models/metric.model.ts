import { Schema, model } from "mongoose";

const MetricSchema = new Schema(
    {
        metric: String,

        timestamp: Date,

        data: Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }
);

MetricSchema.index({ timestamp: -1 });

export const MetricModel = model("Metric", MetricSchema);