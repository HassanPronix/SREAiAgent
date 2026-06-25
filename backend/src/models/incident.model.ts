import { Schema, model } from "mongoose";

const IncidentSchema = new Schema(
    {
        incidentId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: String,

        severity: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
            required: true,
        },

        status: {
            type: String,
            enum: ["OPEN", "INVESTIGATING", "RESOLVED"],
            default: "OPEN",
        },

        namespace: String,

        service: String,

        cluster: String,

        probableRootCause: String,

        recommendation: String,

        startedAt: {
            type: Date,
            required: true,
        },

        resolvedAt: Date,

        relatedEventIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "ObservabilityEvent",
            },
        ],

        metadata: {
            type: Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

IncidentSchema.index({
    status: 1,
    namespace: 1,
});

export const IncidentModel = model(
    "Incident",
    IncidentSchema
);