import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function IncidentSummary() {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold">
          Incident Summary
        </h2>
      </CardHeader>

      <CardContent>
        CPU utilization exceeded 95%...
      </CardContent>
    </Card>
  );
}