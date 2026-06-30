import { api } from "./api";

export const chatService = {
    createChat(title?: string) {
        return api.post("/chats", { title });
    },

    getChats(page = 1, limit = 20) {
        return api.get("/chats", {
            params: { page, limit },
        });
    },

    getChat(chatId: string) {
        return api.get(`/chats/${chatId}`);
    },

    deleteChat(chatId: string) {
        return api.delete(`/chats/${chatId}`);
    },
};