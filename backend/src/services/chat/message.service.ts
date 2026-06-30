import { Types } from "mongoose";
import messageRepository from "../../repositories/message.repository.js";
import { ChatGraph } from "../../graph/chat.graph.js";

class MessageService {

    async createMessage(
        chatId: string,
        role: "user" | "assistant" | "system",
        content: string,
        metadata?: any
    ) {
        return messageRepository.create({
            chatId: new Types.ObjectId(chatId),
            role,
            content,
            metadata,
        });
    }

    async getMessages(
        chatId: string,
        cursor?: string,
        limit = 10
    ) {
        return messageRepository.getMessages(
            chatId,
            cursor,
            limit
        );
    }

    async getConversationHistory(
        chatId: string,
        limit = 15
    ) {
        const messages =
            await messageRepository.getRecentMessages(
                chatId,
                limit
            );

        // Reverse so the oldest message comes first for the LLM
        return messages.reverse();
    }

    async sendMessage(input: {
        chatId: string;
        message: string;
    }) {

        const result = await ChatGraph.invoke({

            chatId: input.chatId,
            userMessage: input.message,

        });

        return result;

    }
}

export default new MessageService()