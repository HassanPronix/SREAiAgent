import { Badge } from "@/components/ui/badge";

export default function IncidentHeader() {
    return (
        <div className="rounded-xl border p-6">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        INC-101
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        High CPU Usage in checkout-service
                    </p>
                </div>

                <div className="flex gap-2">
                    <Badge variant="destructive">
                        Critical
                    </Badge>

                    <Badge>
                        Investigating
                    </Badge>
                </div>
            </div>
        </div>
    );
}