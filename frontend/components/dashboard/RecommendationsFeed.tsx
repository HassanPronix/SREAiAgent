import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const recommendations = [
    {
        recommendation:
            "Scale checkout-service replicas from 3 → 5",
        confidence: 92,
    },
    {
        recommendation:
            "Rollback payment-service deployment v1.2.4",
        confidence: 88,
    },
    {
        recommendation:
            "Increase CPU limits for redis pods",
        confidence: 84,
    },
];

export default function RecommendationsFeed() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>

                <CardDescription>
                    Suggested remediation actions
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                    <div
                        key={index}
                        className="rounded-lg border p-4"
                    >
                        <div className="flex gap-3">
                            <Sparkles className="h-5 w-5 text-primary mt-1" />

                            <div>
                                <p>{rec.recommendation}</p>

                                <Badge className="mt-3">
                                    {rec.confidence}% confidence
                                </Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}