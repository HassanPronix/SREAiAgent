import IncidentHeader from "@/components/incident-details/IncidentHeader";
import IncidentSummary from "@/components/incident-details/IncidentSummary";
import AIRootCause from "@/components/incident-details/AIRootCause";
import RecentLogs from "@/components/incident-details/RecentLogs";
import SimilarIncidents from "@/components/incident-details/SimilarIncidents";
import RecommendationsPanel from "@/components/incident-details/RecommendationsPanel";
import TimelinePanel from "@/components/incident-details/TimelinePanel";

export default function IncidentDetailPage() {
    return (
        <div className="space-y-6">
            <IncidentHeader />

            <div className="grid gap-6 lg:grid-cols-2">
                <IncidentSummary />
                <AIRootCause />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <RecentLogs />
                <SimilarIncidents />
            </div>

            <RecommendationsPanel />

            <TimelinePanel />
        </div>
    );
}