import mongoose from 'mongoose';

const AIAnalysisSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      default: '',
    },

    rootCause: {
      type: String,
      default: '',
    },

    remediation: {
      type: [String],
      default: [],
    },

    commands: {
      type: [String],
      default: [],
    },

    kubernetesYaml: {
      type: String,
      default: '',
    },

    confidence: {
      type: Number,
      default: 0,
    },

    explanation: {
      type: String,
      default: '',
    },

    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
    },

    approvalStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },

    // 🧠 NEW: Human-in-the-loop execution
    approvedCommands: {
      type: [String],
      default: [],
    },

    approvedYaml: {
      type: String,
      default: '',
    },

    approvedBy: {
      type: String,
      default: '',
    },

    approvedAt: {
      type: Date,
    },
  },
  {
    _id: false,
  }
);

const SREResolutionSchema = new mongoose.Schema(
  {
    resolvedBy: {
      type: String,
      default: '',
    },

    resolutionSummary: {
      type: String,
      default: '',
    },

    actualRootCause: {
      type: String,
      default: '',
    },

    actionsPerformed: {
      type: [String],
      default: [],
    },

    commandsExecuted: {
      type: [String],
      default: [],
    },

    preventiveMeasures: {
      type: String,
      default: '',
    },

    aiRecommendationUseful: {
      type: String,
      enum: ['YES', 'NO', 'PARTIAL'],
      default: 'PARTIAL',
    },

    additionalNotes: {
      type: String,
      default: '',
    },

    resolvedAt: Date,
  },
  {
    _id: false,
  },
);

const IncidentSchema = new mongoose.Schema(
  {
    incidentId: String,

    title: String,

    severity: {
      type: String,
      enum: ['INFO', 'WARNING', 'CRITICAL'],
    },

    status: {
      type: String,
      enum: ['OPEN', 'CLOSED'],
    },

    source: String,

    resourceName: String,

    namespace: String,

    message: String,

    occurredAt: Date,

    rawEvent: Object,

    aiAnalysis: {
      type: AIAnalysisSchema,
      default: null,
    },

    similarIncidents: {
      type: Array,
      default: [],
    },

    sreResolution: {
      type: SREResolutionSchema,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model('Incident', IncidentSchema);
