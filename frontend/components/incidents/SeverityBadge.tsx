import { Badge } from "@/components/ui/badge";

interface Props {
    severity: "INFO" | "WARNING" | "CRITICAL";
}

export default function SeverityBadge({
    severity,
}: Props) {
    const styles = {
        CRITICAL: "bg-red-500 hover:bg-red-500",
        WARNING: "bg-yellow-500 hover:bg-yellow-500",
        INFO: "bg-blue-500 hover:bg-blue-500",
    };

    return (
        <Badge className={styles[severity]}>
            {severity}
        </Badge>
    );
}