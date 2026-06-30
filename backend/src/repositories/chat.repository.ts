import { ChatModel, IChat } from "../models/chat.model.js";

export class ChatRepository {
    async create(data: Partial<IChat>) {
        return ChatModel.create(data);
    }

    async findById(chatId: string) {
        return ChatModel.findById(chatId);
    }

    async findAll(
        page = 1,
        limit = 20
    ) {
        return ChatModel.find()
            .sort({ updatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
    }

    async updateLastMessage(
        chatId: string,
        lastMessage: string
    ) {
        return ChatModel.findByIdAndUpdate(
            chatId,
            {
                lastMessage,
                $inc: {
                    totalMessages: 1,
                },
            },
            {
                new: true,
            }
        );
    }

    async delete(chatId: string) {
        return ChatModel.findByIdAndDelete(chatId);
    }
}