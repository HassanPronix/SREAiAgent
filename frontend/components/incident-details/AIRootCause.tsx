import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AIRootCause() {
    return (
        <Card>
            <CardHeader>
                <h2 className="font-semibold">
                    AI Root Cause Analysis
                </h2>
            </CardHeader>

            <CardContent className="space-y-3">
                <p>
                    Recent deployment introduced an
                    infinite retry loop.
                </p>

                <div>
                    Confidence: <strong>94%</strong>
                </div>
            </CardContent>
        </Card>
    );
}