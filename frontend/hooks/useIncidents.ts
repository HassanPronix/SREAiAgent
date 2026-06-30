'use client'

import { useQuery } from "@tanstack/react-query";
import incidentsService from "@/services/incident.service";
import { useIncidentStore } from "@/store/incident-store";
import { useEffect } from "react";

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

    useEffect(() => {
        if (query.data && incidents.length === 0) {
            setIncidents(query.data);
        }
    }, [query.data, incidents.length, setIncidents]);

    return {
        incidents,
        isLoading: query.isLoading,
        error: query.error,
    };
}