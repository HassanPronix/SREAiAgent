import { Card, CardContent } from "@/components/ui/card";
import {
    AlertTriangle,
    CheckCircle2,
    Server,
    Activity,
} from "lucide-react";

const stats = [
    {
        title: "Active Incidents",
        value: "4",
        icon: AlertTriangle,
    },
    {
        title: "Critical Incidents",
        value: "1",
        icon: Activity,
    },
    {
        title: "Healthy Clusters",
        value: "3/4",
        icon: CheckCircle2,
    },
    {
        title: "Nodes Running",
        value: "32",
        icon: Server,
    },
];

export default function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-muted-foreground text-sm">
                                {stat.title}
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {stat.value}
                            </h3>
                        </div>

                        <stat.icon className="h-8 w-8 text-muted-foreground" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}