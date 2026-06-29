import { Badge } from "@/components/ui/badge";

export default function StatusBadge({
    status,
}: {
    status: string;
}) {
    const variants = {
        open: "bg-red-500",
        investigating: "bg-orange-500",
        resolved: "bg-green-500",
    };

    return (
        <Badge className={variants[status as keyof typeof variants]}>
            {status}
        </Badge>
    );
}