"use client";

import { useIncidents } from "@/hooks/useIncidents";

import IncidentStats from "@/components/incidents/IncidentStats";
import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentsTable from "@/components/incidents/IncidentsTable";

export default function IncidentsPage() {
    const { incidents, isLoading } = useIncidents();

    if (isLoading) {
        return <div>Loading incidents...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Incidents
                </h1>

                <p className="text-muted-foreground">
                    Monitor and investigate platform incidents
                </p>
            </div>

            <IncidentStats incidents={incidents} />

            <IncidentFilters />

            <IncidentsTable incidents={incidents} />
        </div>
    );
}