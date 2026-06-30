import { Request, Response } from "express";
import MessageService from "../services/chat/message.service.js";

export class MessageController {

    static async sendMessage(req: Request, res: Response) {

        const response = await MessageService.sendMessage({

            chatId: req.params.chatId as string,
            message: req.body.message,

        });

        res.json(response);

    }

}