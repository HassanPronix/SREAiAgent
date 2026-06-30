import Link from "next/link";
import { ArrowUpRight, History } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Incident } from "@/types/incident";

interface Props {
    incident: Incident;
}

export default function SimilarIncidents({
    incident,
}: Props) {
    const similarIncidents = incident.similarIncidents || [];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />

                    <CardTitle>Similar Incidents</CardTitle>
                </div>

                <CardDescription>
                    Historical incidents retrieved from Vector DB
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {similarIncidents.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                        <p className="text-muted-foreground">
                            No similar incidents found.
                        </p>
                    </div>
                ) : (
                    similarIncidents.map(
                        (similar: any, index: number) => (
                            <div
                                key={similar.incidentId || index}
                                className="rounded-lg border p-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            {similar.incidentId}
                                        </h3>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {similar.title}
                                        </p>
                                    </div>

                                    {similar.similarityScore && (
                                        <Badge variant="secondary">
                                            {similar.similarityScore}% Match
                                        </Badge>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <Badge variant="outline">
                                        {similar.severity || "Unknown"}
                                    </Badge>

                                    <Link
                                        href={`/incidents/${similar.incidentId}`}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                        >
                                            View
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )
                    )
                )}
            </CardContent>
        </Card>
    );
}