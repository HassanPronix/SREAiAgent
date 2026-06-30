import { Request, Response } from 'express';
import IncidentService from '../services/incident/incident.service.js';
import { SimilarityService } from '../services/qdrant/similarity.service.js';

class IncidentController {
  async getIncident(req: Request, res: Response) {
    try {
      const incident = await IncidentService.getIncident(req.params.incidentId as string);

      return res.status(200).json({
        success: true,
        data: incident,
      });
    } catch (error: any) {
      if (error.message === 'Incident not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getIncidents(_: Request, res: Response) {
    try {

      const incidents = await IncidentService.getIncidents();

      return res.status(200).json({
        success: true,
        data: incidents,
      });
    } catch (error: any) {
      if (error.message === 'Incident not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateSREForm(req: Request, res: Response) {

    try {
      const incidentId = req.params.incidentId as string;

      const incident = await IncidentService.updateSREForm(incidentId, req.body,);

      // Trigger async learning pipeline (non-blocking)
      if (incident?.sreResolution) {
        setImmediate(async () => {
          try {
            await SimilarityService.indexIncidentResolution(incident);
          } catch (err) {
            console.error('Qdrant indexing failed:', err);
          }
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Incident resolved successfully.',
        data: incident,
      });
    } catch (error: any) {
      if (error.message === 'Incident not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message || 'Internal Server Error',
      });
    }
  }
}

export default new IncidentController();
