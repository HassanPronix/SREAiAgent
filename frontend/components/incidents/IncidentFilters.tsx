import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IncidentFilters() {
    return (
        <div className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row">
            <Input
                placeholder="Search incidents..."
                className="md:max-w-sm"
            />

            <Button variant="outline">
                Severity
            </Button>

            <Button variant="outline">
                Status
            </Button>

            <Button className="ml-auto">
                Refresh
            </Button>
        </div>
    );
}