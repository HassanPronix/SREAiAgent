import { Schema, model } from 'mongoose';

const LogSchema = new Schema(
  {
    timestamp: Date,

    source: String,

    severity: String,

    cluster: String,

    namespace: String,

    pod: String,

    container: String,

    service: String,

    requestId: String,

    traceId: String,

    message: String,

    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
);
LogSchema.index({ timestamp: -1 });
LogSchema.index({ service: 1 });
LogSchema.index({ requestId: 1 });
LogSchema.index({ traceId: 1 });

export const LogModel = model('Log', LogSchema);
