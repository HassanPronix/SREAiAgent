import { Card, CardContent } from "@/components/ui/card";
import { Incident } from "@/types/incident";

interface IncidentStatsProps {
    incidents: Incident[];
}

export default function IncidentStats({
    incidents,
}: IncidentStatsProps) {
    const activeIncidents = incidents.filter(
        (incident) => incident.status === "OPEN"
    ).length;

    const criticalIncidents = incidents.filter(
        (incident) => incident.severity === "CRITICAL"
    ).length;

    const resolvedToday = incidents.filter((incident) => {
        if (incident.status !== "CLOSED") return false;

        const updatedDate = new Date(incident.updatedAt);
        const today = new Date();

        return (
            updatedDate.getDate() === today.getDate() &&
            updatedDate.getMonth() === today.getMonth() &&
            updatedDate.getFullYear() === today.getFullYear()
        );
    }).length;

    const stats = [
        {
            title: "Active Incidents",
            value: activeIncidents,
        },
        {
            title: "Critical Incidents",
            value: criticalIncidents,
        },
        {
            title: "Resolved Today",
            value: resolvedToday,
        },
        {
            title: "Total Incidents",
            value: incidents.length,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                            {stat.title}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {stat.value}
                        </h2>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}