import { OpenAIEmbeddings }
    from "@langchain/openai";

// TODO: implement Qdrant first
class EmbeddingService {

    private embeddings = new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY, model: "text-embedding-3-small"
    });

    async generateEmbedding(
        text: string
    ): Promise<number[]> {

        return this.embeddings.embedQuery(
            text
        );
    }
}

export const embeddingService = new EmbeddingService();