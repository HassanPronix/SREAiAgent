import { getChatVectorStore } from './chat-vector-store.service.js';
import { getVectorStore } from './vector-store.service.js';

export class SimilarityService {

  static async findSimilarIncidents(event: any) {

    const vectorStore = getVectorStore();

    // 1. Better structured query
    const query = `
          [INCIDENT TITLE]
          ${event.title || ''}

          [ERROR MESSAGE]
          ${event.message || ''}

          [SYMPTOMS]
          ${event.reason || ''}

          [SYSTEM CONTEXT]
          Resource: ${event.resourceName || ''}
          Namespace: ${event.namespace || ''}
          Severity: ${event.severity || ''}
    `.trim();

    const results = await vectorStore.similaritySearchWithScore(query, 15);

    const enriched = results.map(([doc, score]) => {
      let boost = 0;

      // same resource = strong signal
      if (doc.metadata?.resourceName === event.resourceName) {
        boost += 0.12;
      }

      // same namespace = medium signal
      if (doc.metadata?.namespace === event.namespace) {
        boost += 0.08;
      }

      // same severity = weak signal
      if (doc.metadata?.severity === event.severity) {
        boost += 0.05;
      }

      const finalScore = score + boost;

      return {
        score: finalScore,
        rawScore: score,
        incidentId: doc.metadata.incidentId,
        metadata: doc.metadata,
        content: doc.pageContent,
      };
    });

    enriched.sort((a, b) => b.score - a.score);

    const top = enriched.slice(0, 5);

    return top
  }

  static async indexIncidentResolution(incident: any) {
    if (!incident?.sreResolution) return;

    const resolution = incident.sreResolution;
    const ai = incident.aiAnalysis;

    //  Build a structured learning document
    const documentText = `
            [INCIDENT CONTEXT]
            Title: ${incident.title || ''}
            Severity: ${incident.severity || ''}
            Message: ${incident.message || ''}
            Resource: ${incident.resourceName || ''}
            Namespace: ${incident.namespace || ''}

            [SYMPTOMS]
            ${incident.message || ''}

            [ROOT CAUSE]
            ${resolution.actualRootCause || ''}

            [RESOLUTION SUMMARY]
            ${resolution.resolutionSummary || ''}

            [ACTIONS PERFORMED]
            ${(resolution.actionsPerformed || []).join('\n')}

            [COMMANDS EXECUTED]
            ${(resolution.commandsExecuted || []).join('\n')}

            [PREVENTIVE MEASURES]
            ${resolution.preventiveMeasures || ''}

            [AI CONTEXT]
            AI Summary: ${ai?.summary || ''}
            AI Root Cause: ${ai?.rootCause || ''}
            AI Recommendation Used: ${resolution.aiRecommendationUseful || 'UNKNOWN'}
    `.trim();

    const vectorStore = getVectorStore();

    // Store as a resolution knowledge document
    await vectorStore.addDocuments([
      {
        pageContent: documentText,
        metadata: {
          incidentId: incident.incidentId,
          type: 'sre_resolution',
          severity: incident.severity,
          resourceName: incident.resourceName,
          namespace: incident.namespace,
          createdAt: new Date().toISOString(),
        },
      },
    ]);
  }

}