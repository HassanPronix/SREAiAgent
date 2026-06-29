import { Badge } from "@/components/ui/badge";

interface Props {
    status: "OPEN" | "CLOSED";
}

export default function StatusBadge({
    status,
}: Props) {
    const styles = {
        OPEN: "bg-red-500 hover:bg-red-500",
        CLOSED: "bg-green-500 hover:bg-green-500",
    };

    return (
        <Badge className={styles[status]}>
            {status}
        </Badge>
    );
}