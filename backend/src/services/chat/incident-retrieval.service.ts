import { SimilarityService } from "../../services/qdrant/similarity.service.js";

export class IncidentRetrievalService {

    static async retrieve(query: string) {

        return SimilarityService.findSimilarIncidents({
            title: query,
            message: query,
            reason: query
        });

    }

}