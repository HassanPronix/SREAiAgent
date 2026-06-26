
import { getVectorStore } from "./vector-store.service.js";

export class SimilarityService {

    static async findSimilarIncidents(
        event: any
    ) {

        const query = `
      ${event.message || ""}
      ${event.reason || ""}
      ${event.resourceName || ""}
    `;

        const vectorStore = getVectorStore();

        const results = await vectorStore.similaritySearchWithScore(query, 5);

        return results
            .filter(([_, score]) => score > 0.8)
            .map(([doc, score]) => ({
                score,

                incidentId:
                    doc.metadata.incidentId,

                metadata:
                    doc.metadata,

                content:
                    doc.pageContent
            }));
    }
}