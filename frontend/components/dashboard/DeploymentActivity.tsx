import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { GitCommitHorizontal } from "lucide-react";

const deployments = [
    {
        service: "checkout-service",
        version: "v1.2.4",
        time: "15 mins ago",
    },
    {
        service: "payment-service",
        version: "v1.8.1",
        time: "1 hour ago",
    },
    {
        service: "auth-service",
        version: "v2.1.0",
        time: "3 hours ago",
    },
];

export default function DeploymentActivity() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Deployment Activity</CardTitle>

                <CardDescription>
                    Recent deployments
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {deployments.map((deployment, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 rounded-lg border p-3"
                    >
                        <GitCommitHorizontal className="h-5 w-5 text-primary mt-1" />

                        <div>
                            <h4 className="font-medium">
                                {deployment.service}
                            </h4>

                            <p className="text-sm text-muted-foreground">
                                {deployment.version}
                            </p>

                            <span className="text-xs text-muted-foreground">
                                {deployment.time}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}