import StatsCards from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <StatsCards />

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="h-80 rounded-xl border p-4">
                    Incident Timeline
                </div>

                <div className="h-80 rounded-xl border p-4">
                    Cluster Health
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="h-80 rounded-xl border p-4">
                    AI Recommendations
                </div>

                <div className="h-80 rounded-xl border p-4">
                    Deployment Activity
                </div>
            </div>
        </div>
    );
}