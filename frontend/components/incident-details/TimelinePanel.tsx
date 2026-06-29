import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Clock3 } from "lucide-react";

const timeline = [
    {
        time: "10:20 AM",
        event: "CPU usage crossed 85%",
    },
    {
        time: "10:22 AM",
        event: "Incident automatically created",
    },
    {
        time: "10:23 AM",
        event: "AI root cause analysis initiated",
    },
    {
        time: "10:24 AM",
        event: "Historical incidents retrieved from Vector DB",
    },
    {
        time: "10:25 AM",
        event: "Recommendations generated",
    },
];

export default function TimelinePanel() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Clock3 className="h-5 w-5" />
                    <CardTitle>Incident Timeline</CardTitle>
                </div>

                <CardDescription>
                    Chronological sequence of incident events
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-5">
                    {timeline.map((item, index) => (
                        <div key={index}>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="h-3 w-3 rounded-full bg-primary" />

                                    {index !== timeline.length - 1 && (
                                        <div className="mt-1 h-full w-px bg-border" />
                                    )}
                                </div>

                                <div className="pb-5">
                                    <p className="text-sm font-medium">
                                        {item.time}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {item.event}
                                    </p>
                                </div>
                            </div>

                            {index !== timeline.length - 1 && (
                                <Separator className="mt-2" />
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}