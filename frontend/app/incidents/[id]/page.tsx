"use client";

import { useParams } from "next/navigation";

import IncidentHeader from "@/components/incident-details/IncidentHeader";
import IncidentSummary from "@/components/incident-details/IncidentSummary";
import AIRootCause from "@/components/incident-details/AIRootCause";
import RecentLogs from "@/components/incident-details/RecentLogs";
import SimilarIncidents from "@/components/incident-details/SimilarIncidents";
import RecommendationsPanel from "@/components/incident-details/RecommendationsPanel";
import TimelinePanel from "@/components/incident-details/TimelinePanel";
import SREResolutionForm from "@/components/incident-details/SREResolutionForm";

import { useIncidentStore } from "@/store/incident-store";

export default function IncidentDetailPage() {
    const params = useParams();

    const incident = useIncidentStore((state) =>
        state.incidents.find(
            (incident) => incident.incidentId === params.id
        )
    );

    if (!incident) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">
                    Incident not found
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <IncidentHeader incident={incident} />

            <div className="grid gap-6 lg:grid-cols-2">
                <IncidentSummary incident={incident} />
                <AIRootCause incident={incident} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* <RecentLogs incident={incident} /> */}
                <SimilarIncidents incident={incident} />
            </div>

            <RecommendationsPanel incident={incident} />

            {/* <TimelinePanel incident={incident} /> */}

            {incident.status === "OPEN" &&
                !incident.sreResolution && (
                    <SREResolutionForm
                        incidentId={incident.incidentId}
                    />
                )}
        </div>
    );
}