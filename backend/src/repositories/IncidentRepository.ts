import IncidentModel from '../models/incident.model.js';

class IncidentRepository {
  async findByIncidentId(incidentId: string) {
    return IncidentModel.findOne({ incidentId });
  }

  async save(incident: any) {
    return incident.save();
  }
}

export default new IncidentRepository();
