import { Request, Response } from "express";
import { ChatService } from "../services/chat/chat.service.js";
import messageRepository  from "../repositories/message.repository.js";

const chatService = new ChatService();

class ChatController {
    async createChat(req: Request, res: Response) {

        const { title } = req.body;

        const chat = await chatService.createChat(title);

        return res.status(201).json({
            success: true,
            data: chat,
        });
    }

    async getChats(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const chats = await chatService.getChats(page, limit);

        return res.json({
            success: true,
            data: chats,
        });
    }

    async getChat(req: Request, res: Response) {
        const { chatId } = req.params;

        const chat = await chatService.getChat(chatId as string);

        return res.json({
            success: true,
            data: chat,
        });
    }

    async deleteChat(req: Request, res: Response) {
        const { chatId } = req.params;

        // await messageRepository.deleteByChatId(chatId as string);

        await chatService.deleteChat(chatId as string);

        return res.json({
            success: true,
            message: "Chat deleted successfully",
        });
    }
}

export default new ChatController()