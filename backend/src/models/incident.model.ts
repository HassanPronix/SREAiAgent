import mongoose from "mongoose";


const AIAnalysisSchema = new mongoose.Schema(
    {
        summary: {
            type: String,
            default: ""
        },

        rootCause: {
            type: String,
            default: ""
        },

        remediation: {
            type: [String],
            default: []
        },

        confidence: {
            type: Number,
            default: 0
        },

        explanation: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);


const IncidentSchema = new mongoose.Schema(
    {

        incidentId: String,

        title: String,

        severity: {
            type: String,
            enum: ["INFO", "WARNING", "CRITICAL"]
        },

        status: {
            type: String,
            enum: ["OPEN", "CLOSED"]
        },

        source: String,

        resourceName: String,

        namespace: String,

        message: String,

        occurredAt: Date,

        rawEvent: Object,


        aiAnalysis: {
            type: AIAnalysisSchema,
            default: null
        },


        similarIncidents: {
            type: Array,
            default: []
        }

    },
    {
        timestamps: true
    }
);


export default mongoose.model(
    "Incident",
    IncidentSchema
);