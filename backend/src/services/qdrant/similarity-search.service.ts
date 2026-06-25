import { embeddingService } from "./embedding.service.js";
import { qdrantService } from "./qdrant.service.js";

// TODO: implement Qdrant first
export async function findSimilarIncidents(summary: string) {

    const vector = await embeddingService.generateEmbedding(summary);

    return qdrantService.client.search(
        "incident_knowledge",
        {
            vector,

            limit: 5,

            score_threshold: 0.75,
        }
    );
}