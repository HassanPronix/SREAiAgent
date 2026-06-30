import { Router } from "express";
import { MessageController } from "../controllers/message.controller.js";


const router = Router();

router.post("/:chatId/messages", MessageController.sendMessage);

export default router;