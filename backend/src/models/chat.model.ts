import { Schema, model, Document } from "mongoose";

export interface IChat extends Document {
    title: string;
    createdBy: string;
    lastMessage: string;
    totalMessages: number;
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
    {
        title: {
            type: String,
            default: "New Chat",
            trim: true,
        },

        createdBy: {
            type: String,
            required: true,
            index: true,
        },

        lastMessage: {
            type: String,
            default: "",
        },

        totalMessages: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

chatSchema.index({
    createdBy: 1,
    updatedAt: -1,
});

export const ChatModel = model<IChat>("Chat", chatSchema);