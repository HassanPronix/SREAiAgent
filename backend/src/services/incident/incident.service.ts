import { logger } from '../../config/logger.js';
import incidentModel from '../../models/incident.model.js';
import crypto from 'crypto';
import { SimilarityService } from '../qdrant/similarity.service.js';
import { RCAService } from '../llm/rca.service.js';
import IncidentRepository from '../../repositories/IncidentRepository.js';

class IncidentService {
  static async processEvent(topic: string, payload: any) {
    try {
      let isIncident = true;

      switch (topic) {
        case 'backend-logs':
          if (payload.level === 'error' || payload.level === 'fatal') {
            isIncident = true;
          }

          break;

        case 'metric-anomalies':
          if (payload.severity === 'CRITICAL') {
            isIncident = true;
          }

          break;

        case 'pod-events':
          if (['CrashLoopBackOff', 'OOMKilled', 'FailedScheduling'].includes(payload.reason)) {
            isIncident = true;
          }

          break;

        case 'node-events':
          if (['NodeNotReady', 'MemoryPressure', 'DiskPressure'].includes(payload.reason)) {
            isIncident = true;
          }

          break;

        case 'deployment-events':
          if (payload.status === 'FAILED') {
            isIncident = true;
          }

          break;
      }

      if (!isIncident) {
        logger.debug(
          {
            event: 'incident_event_ignored',

            metadata: {
              topic,

              reason: payload.reason || payload.level || 'unknown',
            },
          },

          'Event ignored, not an incident',
        );

        return;
      }

      const incident = {
        incidentId: crypto.randomUUID(),

        title: `${topic} incident`,

        severity: 'CRITICAL' as const,

        status: 'OPEN' as const,

        source: topic,

        resourceName:
          payload.resourceName || payload.pod || payload.node || payload.deployment || '',

        namespace: payload.namespace || '',

        message: payload.message || payload.reason || payload.error || '',

        occurredAt: payload.timestamp ? new Date(payload.timestamp) : new Date(),

        rawEvent: payload,

        aiAnalysis: null,
      };

      logger.warn(
        {
          event: 'incident_detected',

          metadata: {
            incidentId: incident.incidentId,

            topic,

            resource: incident.resourceName,

            namespace: incident.namespace,
          },
        },

        'Incident detected',
      );

      const similarIncidents = await SimilarityService.findSimilarIncidents(payload);

      logger.info(
        {
          event: 'similar_incidents_search_completed',

          metadata: {
            incidentId: incident.incidentId,

            similarCount: similarIncidents.length,
          },
        },

        'Similar incidents search completed',
      );

      const analysis = await RCAService.analyze(incident, similarIncidents);

      logger.info(
        {
          event: 'rca_analysis_completed',

          metadata: {
            incidentId: incident.incidentId,

            confidence: analysis.confidence,

            rootCause: analysis.rootCause,
          },
        },

        'RCA analysis completed',
      );

      const enrichedIncident = {
        ...incident,

        aiAnalysis: analysis,

        similarIncidents,
      };

      await incidentModel.create(enrichedIncident);

      logger.info(
        {
          event: 'incident_stored',

          metadata: {
            incidentId: incident.incidentId,
          },
        },

        'Incident stored successfully',
      );
    } catch (error) {
      logger.error(
        {
          event: 'incident_processing_failed',

          err: error,

          metadata: {
            component: 'incident-processing',

            incidentType: 'INCIDENT_PROCESSING_FAILURE',

            topic,
          },
        },

        'Failed to process incident',
      );

      throw error;
    }
  }

  async getIncident(incidentId: string) {
    const incident = await IncidentRepository.findByIncidentId(incidentId);

    if (!incident) {
      throw new Error('Incident not found');
    }

    return incident;
  }

  async updateSREForm(incidentId: string, data: any) {
    const incident = await IncidentRepository.findByIncidentId(incidentId);

    if (!incident) {
      throw new Error('Incident not found');
    }

    incident.sreResolution = {
      resolvedBy: data.resolvedBy,
      resolutionSummary: data.resolutionSummary,
      actualRootCause: data.actualRootCause,
      actionsPerformed: data.actionsPerformed || [],
      commandsExecuted: data.commandsExecuted || [],
      preventiveMeasures: data.preventiveMeasures,
      aiRecommendationUseful: data.aiRecommendationUseful,
      additionalNotes: data.additionalNotes,
      resolvedAt: new Date(),
    };

    incident.status = 'CLOSED';

    await IncidentRepository.save(incident);

    return incident;
  }
}

export default new IncidentService();
