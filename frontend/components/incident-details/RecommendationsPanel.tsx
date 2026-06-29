import { Check, Sparkles, X } from "lucide-react";

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

export default function RecommendationsPanel({
    incident,
}: Props) {
    const recommendations =
        incident.aiAnalysis?.remediation || [];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <CardTitle>AI Recommendations</CardTitle>
                </div>

                <CardDescription>
                    AI-generated remediation actions
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {recommendations.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                        <p className="text-muted-foreground">
                            No AI recommendations available yet.
                        </p>
                    </div>
                ) : (
                    recommendations.map((recommendation, index) => (
                        <div
                            key={index}
                            className="rounded-lg border p-5"
                        >
                            <h3 className="font-semibold">
                                {recommendation}
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Badge variant="secondary">
                                    Confidence:{" "}
                                    {incident.aiAnalysis?.confidence ?? 0}%
                                </Badge>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button>
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                </Button>

                                <Button variant="destructive">
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}