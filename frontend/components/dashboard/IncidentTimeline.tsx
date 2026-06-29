import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { AlertTriangle } from "lucide-react";

const incidents = [
    {
        service: "checkout-service",
        severity: "Critical",
        time: "2 mins ago",
        message: "CPU usage exceeded 95%",
    },
    {
        service: "payment-service",
        severity: "Warning",
        time: "10 mins ago",
        message: "Pod restarted multiple times",
    },
    {
        service: "redis",
        severity: "Critical",
        time: "30 mins ago",
        message: "Connection timeout detected",
    },
];

export default function IncidentTimeline() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
                <CardDescription>
                    Latest platform incidents
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {incidents.map((incident, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 rounded-lg border p-3"
                    >
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />

                        <div>
                            <h4 className="font-medium">
                                {incident.service}
                            </h4>

                            <p className="text-sm text-muted-foreground">
                                {incident.message}
                            </p>

                            <span className="text-xs text-muted-foreground">
                                {incident.time}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}