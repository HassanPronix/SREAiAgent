import { Router } from "express";
import ChatController from "../controllers/chat.controller.js";

const router = Router();

router.post("/", ChatController.createChat);

router.get("/", ChatController.getChats);

router.get("/:chatId", ChatController.getChat);

router.delete("/:chatId", ChatController.deleteChat);

export default router;