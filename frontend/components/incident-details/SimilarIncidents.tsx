import Link from "next/link";
import { ArrowUpRight, History } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const incidents = [
    {
        id: "INC-089",
        title: "Checkout service high CPU",
        similarity: 96,
        severity: "Critical",
    },
    {
        id: "INC-073",
        title: "Payment retry loop detected",
        similarity: 91,
        severity: "Warning",
    },
    {
        id: "INC-012",
        title: "Worker thread exhaustion",
        similarity: 87,
        severity: "Critical",
    },
];

export default function SimilarIncidents() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <CardTitle>Similar Incidents</CardTitle>
                </div>

                <CardDescription>
                    Retrieved from historical incidents stored in Vector DB
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {incidents.map((incident) => (
                    <div
                        key={incident.id}
                        className="rounded-lg border p-4"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold">{incident.id}</h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {incident.title}
                                </p>
                            </div>

                            <Badge variant="secondary">
                                {incident.similarity}% Match
                            </Badge>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <Badge variant="outline">
                                {incident.severity}
                            </Badge>

                            <Link href={`/incidents/${incident.id}`}>
                                <Button variant="ghost" size="sm">
                                    View
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}