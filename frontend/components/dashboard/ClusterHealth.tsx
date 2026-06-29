import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

const clusters = [
    {
        name: "prod-cluster",
        health: 92,
    },
    {
        name: "staging-cluster",
        health: 100,
    },
    {
        name: "dev-cluster",
        health: 78,
    },
];

export default function ClusterHealth() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Cluster Health</CardTitle>

                <CardDescription>
                    Overall cluster status
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {clusters.map((cluster) => (
                    <div key={cluster.name}>
                        <div className="mb-2 flex justify-between">
                            <span>{cluster.name}</span>

                            <span>{cluster.health}%</span>
                        </div>

                        <Progress value={cluster.health} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}