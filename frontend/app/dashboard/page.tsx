'use client'

import StatsCards from "@/components/dashboard/StatsCard";
import IncidentTimeline from "@/components/dashboard/IncidentTimeline";
import ClusterHealth from "@/components/dashboard/ClusterHealth";
import RecommendationsFeed from "@/components/dashboard/RecommendationsFeed";
import DeploymentActivity from "@/components/dashboard/DeploymentActivity";
import { useIncidents } from "@/hooks/useIncidents";

export default function DashboardPage() {

    const { incidents, isLoading } = useIncidents();

    if (isLoading) {
        return <div>Loading dashboard...</div>;
    }
    return (
        <div className="space-y-6">
            <StatsCards incidents={incidents} />

            <div className="grid gap-6 lg:grid-cols-2">
                <IncidentTimeline />
                <ClusterHealth />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* <RecommendationsFeed /> */}
                <DeploymentActivity />
            </div>
        </div>
    );
}