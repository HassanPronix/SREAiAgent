import { IncidentModel } from "../models/incident.model.js";

class IncidentRepository {
    async create(payload: any) {
        return IncidentModel.create(payload);
    }

    async findOpenIncident(namespace?: string | null, service?: string | null) {
        return IncidentModel.findOne({
            status: "OPEN",
            namespace,
            service,
        });
    }
}

export const incidentRepository = new IncidentRepository();