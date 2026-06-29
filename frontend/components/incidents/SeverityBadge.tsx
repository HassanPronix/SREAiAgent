import { Badge } from "@/components/ui/badge";

export default function SeverityBadge({
    severity,
}: {
    severity: string;
}) {
    const variants = {
        critical: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500",
    };

    return (
        <Badge className={variants[severity as keyof typeof variants]}>
            {severity}
        </Badge>
    );
}