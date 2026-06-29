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

export default function AIRootCause({
    incident,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    AI Root Cause Analysis
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <p>
                    {incident.aiAnalysis?.rootCause ||
                        "AI analysis pending"}
                </p>

                <div>
                    Confidence:{" "}
                    <strong>
                        {incident.aiAnalysis?.confidence ?? 0}%
                    </strong>
                </div>

                <div>
                    <h4 className="font-semibold">
                        Explanation
                    </h4>

                    <p className="text-sm text-muted-foreground">
                        {incident.aiAnalysis?.explanation}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}