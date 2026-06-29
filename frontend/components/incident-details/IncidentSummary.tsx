import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Incident } from "@/types/incident";

interface Props {
  incident: Incident;
}

export default function IncidentSummary({
  incident,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <strong>Source:</strong> {incident.source}
        </div>

        <div>
          <strong>Namespace:</strong>{" "}
          {incident.namespace || "-"}
        </div>

        <div>
          <strong>Resource:</strong>{" "}
          {incident.resourceName || "-"}
        </div>

        <div>
          <strong>Occurred:</strong>{" "}
          {new Date(
            incident.occurredAt
          ).toLocaleString()}
        </div>

        <div>
          <strong>Message:</strong>
          <p className="mt-2 text-muted-foreground">
            {incident.message ||
              incident.aiAnalysis?.summary ||
              "No summary available"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}