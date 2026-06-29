import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AIRootCause() {
    return (
        <Card>
            <CardHeader>
                <h2>Recent Logs</h2>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg bg-black p-4 font-mono text-sm">
                    ERROR Retrying payment validation

                    WARN CPU usage exceeded threshold

                    ERROR Request timeout after 30s
                </div>
            </CardContent>
        </Card>
    );
}