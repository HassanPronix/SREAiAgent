import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

class VectorStoreService {
    private vectorStore: QdrantVectorStore | null = null;

    async getVectorStore(): Promise<QdrantVectorStore> {
        if (this.vectorStore) {
            return this.vectorStore;
        }

        const embeddings = new OpenAIEmbeddings({
            apiKey: process.env.OPENAI_API_KEY,
            model: "text-embedding-3-small",
        });

        this.vectorStore = await QdrantVectorStore.fromExistingCollection(
            embeddings,
            {
                url:
                    process.env.QDRANT_URL ||
                    "http://localhost:6333",

                collectionName:
                    process.env.QDRANT_COLLECTION ||
                    "incident_knowledge",
            }
        );

        return this.vectorStore;
    }
}

export const vectorStoreService = new VectorStoreService();