import { getChatVectorStore } from "../qdrant/chat-vector-store.service.js";

export class ChatMemoryService {

    static async search(chatId: string, query: string) {

        const vectorStore = getChatVectorStore();

        const docs = await vectorStore.similaritySearch(query, 5, {
            must: [
                {
                    key: "metadata.chatId",
                    match: {
                        value: chatId,
                    },
                },
            ],
        });

        return docs;

    }

}