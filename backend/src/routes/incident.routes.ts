import express from 'express';
import sreController from '../controllers/incident.controller.js';

const router = express.Router();

// Get SRE Resolution Form
router.get('/:incidentId/sre-resolution', sreController.getIncident);

// Update SRE Resolution & Close Incident
router.put('/:incidentId/sre-resolution', sreController.updateSREForm);

export default router;
