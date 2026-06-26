import { Schema, model } from 'mongoose';

const K8sEventSchema = new Schema(
  {
    timestamp: Date,

    source: String,

    namespace: String,

    kind: String,

    resourceName: String,

    reason: String,

    message: String,

    type: String,

    severity: String,

    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
);

K8sEventSchema.index({
  timestamp: -1,
});

export const K8sEventModel = model('K8sEvent', K8sEventSchema);
