import { Check, X, Sparkles } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recommendations = [
    {
        id: 1,
        action: "Scale checkout-service replicas from 3 → 5",
        confidence: 92,
        impact: "Low",
    },
    {
        id: 2,
        action: "Rollback deployment v1.2.4",
        confidence: 89,
        impact: "Medium",
    },
    {
        id: 3,
        action: "Increase CPU limits to 1000m",
        confidence: 85,
        impact: "Low",
    },
];

export default function RecommendationsPanel() {
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
                {recommendations.map((recommendation) => (
                    <div
                        key={recommendation.id}
                        className="rounded-lg border p-5"
                    >
                        <h3 className="font-semibold">
                            {recommendation.action}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <Badge variant="secondary">
                                Confidence: {recommendation.confidence}%
                            </Badge>

                            <Badge variant="outline">
                                Impact: {recommendation.impact}
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
                ))}
            </CardContent>
        </Card>
    );
}