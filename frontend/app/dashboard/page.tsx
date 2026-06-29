import StatsCards from "@/components/dashboard/StatsCard";
import IncidentTimeline from "@/components/dashboard/IncidentTimeline";
import ClusterHealth from "@/components/dashboard/ClusterHealth";
import RecommendationsFeed from "@/components/dashboard/RecommendationsFeed";
import DeploymentActivity from "@/components/dashboard/DeploymentActivity";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <StatsCards />

            <div className="grid gap-6 lg:grid-cols-2">
                <IncidentTimeline />
                <ClusterHealth />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <RecommendationsFeed />
                <DeploymentActivity />
            </div>
        </div>
    );
}