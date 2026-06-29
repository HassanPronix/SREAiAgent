'use client'

import { useQuery } from "@tanstack/react-query";
import incidentsService from "@/services/incident.service";
import { useIncidentStore } from "@/store/incident-store";

export function useIncidents() {
    const incidents = useIncidentStore(
        (state) => state.incidents
    );

    const setIncidents = useIncidentStore(
        (state) => state.setIncidents
    );

    const query = useQuery({
        queryKey: ["incidents"],
        queryFn: incidentsService.getAll,
    });

    if (query.data && incidents.length === 0) {
        setIncidents(query.data);
    }

    return {
        incidents,
        isLoading: query.isLoading,
        error: query.error,
    };
}