import { Badge } from "@/components/ui/badge";
import { Incident } from "@/types/incident";

interface Props {
    incident: Incident;
}

export default function IncidentHeader({
    incident,
}: Props) {
    return (
        <div className="rounded-xl border p-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {incident.title}
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        {incident.incidentId}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Badge>{incident.severity}</Badge>
                    <Badge variant="outline">
                        {incident.status}
                    </Badge>
                </div>
            </div>
        </div>
    );
}