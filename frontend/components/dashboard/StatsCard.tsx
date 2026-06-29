import { Incident } from "@/types/incident";

interface Props {
    incidents: Incident[];
}

export default function StatsCards({
    incidents,
}: Props) {
    const activeCount = incidents.filter(
        (i) => i.status === "OPEN"
    ).length;

    const criticalCount = incidents.filter(
        (i) => i.severity === "CRITICAL"
    ).length;

    const resolvedCount = incidents.filter(
        (i) => i.status === "CLOSED"
    ).length;

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="rounded-lg border p-6">
                <h3>Active Incidents</h3>
                <p className="text-3xl font-bold">
                    {activeCount}
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <h3>Critical</h3>
                <p className="text-3xl font-bold">
                    {criticalCount}
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <h3>Resolved</h3>
                <p className="text-3xl font-bold">
                    {resolvedCount}
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <h3>Total</h3>
                <p className="text-3xl font-bold">
                    {incidents.length}
                </p>
            </div>
        </div>
    );
}