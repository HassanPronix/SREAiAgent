import express from 'express';
import incidentController from '../controllers/incident.controller.js';
import sseController from '../controllers/sse.controller.js';

const router = express.Router();

// Get SRE Resolution Form

router.get('/', incidentController.getIncidents)

router.get('/:incidentId', incidentController.getIncident);

// Update SRE Resolution & Close Incident
router.put('/:incidentId/sre-resolution', incidentController.updateSREForm);

router.get("/events", sseController.connect);

export default router;
