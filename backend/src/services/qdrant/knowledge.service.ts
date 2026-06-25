import { qdrantService } from "./qdrant.service.js";
import { embeddingService } from "./embedding.service.js";
import { buildIncidentSummary } from "./incident-summary.service.js";

// TODO: implement Qdrant first
export async function
    storeResolvedIncident(
        incident: any
    ) {

    const summary = buildIncidentSummary(incident);

    const vector = await embeddingService.generateEmbedding(summary);

    await qdrantService.client.upsert("incident_knowledge", {
        wait: true,

        points: [
            {
                id: incident.incidentId,

                vector,

                payload: {
                    incidentId: incident.incidentId,

                    title: incident.title,

                    severity: incident.severity,

                    namespace: incident.namespace,

                    service: incident.service,

                    rootCause: incident.rootCause,

                    recommendation: incident.recommendation,

                    summary,

                    createdAt:
                        new Date(),
                },
            },
        ],
    }
    );
}