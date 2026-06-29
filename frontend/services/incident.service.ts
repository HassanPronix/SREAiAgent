import { api } from "./api";
import {
    Incident,
    IncidentApiResponse,
    SingleIncidentResponse,
} from "@/types/incident";

class IncidentsService {
    async getAll(): Promise<Incident[]> {
        const response =
            await api.get<IncidentApiResponse>("/incidents");

        return response.data.data;
    }

    async getById(id: string): Promise<Incident> {
        const response =
            await api.get<SingleIncidentResponse>(
                `/incidents/${id}`
            );

        return response.data.data;
    }

    async resolveIncident(
        id: string,
        payload: any
    ): Promise<Incident> {
        const response =
            await api.post<SingleIncidentResponse>(
                `/incidents/${id}/resolve`,
                payload
            );

        return response.data.data;
    }
};

export default new IncidentsService()