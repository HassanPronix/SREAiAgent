import IncidentStats from "@/components/incidents/IncidentStats";
import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentsTable from "@/components/incidents/IncidentsTable";

export default function IncidentsPage() {
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

            <IncidentStats />

            <IncidentFilters />

            <IncidentsTable />
        </div>
    );
}