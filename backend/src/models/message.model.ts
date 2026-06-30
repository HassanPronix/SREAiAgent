import { Schema, model, Document, Types } from "mongoose";

export type MessageRole = "user" | "assistant" | "system";

export interface IMessage extends Document {
    chatId: Types.ObjectId;

    role: MessageRole;

    content: string;

    metadata?: {
        model?: string;
        tokens?: number;
        latency?: number;
        citations?: string[];
    };

    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
            index: true,
        },

        role: {
            type: String,
            enum: ["user", "assistant", "system"],
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        metadata: {
            model: String,
            tokens: Number,
            latency: Number,
            citations: [String],
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.index({
    chatId: 1,
    createdAt: -1,
});

export const MessageModel = model<IMessage>(
    "Message",
    messageSchema
);