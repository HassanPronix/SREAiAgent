
import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "../embeddings/embeddings.service.js";

let vectorStore: QdrantVectorStore;

export async function initializeVectorStore() {
    vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: process.env.QDRANT_URL!,
            collectionName: "incidents",
        }
    );

    return vectorStore;
}

export function getVectorStore() {
    if (!vectorStore) {
        throw new Error(
            "Vector store not initialized"
        );
    }

    return vectorStore;
}