import { Card, CardContent } from "@/components/ui/card";

const stats = [
    {
        title: "Active",
        value: 12,
    },
    {
        title: "Critical",
        value: 3,
    },
    {
        title: "Resolved Today",
        value: 28,
    },
    {
        title: "Avg Resolution",
        value: "14m",
    },
];

export default function IncidentStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                            {stat.title}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {stat.value}
                        </h2>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}