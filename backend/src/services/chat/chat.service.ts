import { ChatRepository } from "../../repositories/chat.repository.js";

export class ChatService {
    private chatRepository = new ChatRepository();

    async createChat(title?: string, createdBy?: string) {
        return this.chatRepository.create({
            title: title || "New Chat",
            createdBy: createdBy || "system",
        });
    }

    async getChats(page = 1, limit = 20) {
        return this.chatRepository.findAll(page, limit);
    }

    async getChat(chatId: string) {
        return this.chatRepository.findById(chatId);
    }

    async updateLastMessage(chatId: string, message: string) {
        return this.chatRepository.updateLastMessage(
            chatId,
            message
        );
    }

    async deleteChat(chatId: string) {
        return this.chatRepository.delete(chatId);
    }
}