import Link from "next/link";

import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

export const incidents = [
    {
        id: "INC-101",
        service: "checkout-service",
        severity: "critical",
        status: "open",
        confidence: 94,
        createdAt: "2 mins ago",
    },
    {
        id: "INC-102",
        service: "payment-service",
        severity: "warning",
        status: "investigating",
        confidence: 88,
        createdAt: "15 mins ago",
    },
    {
        id: "INC-103",
        service: "redis",
        severity: "info",
        status: "resolved",
        confidence: 97,
        createdAt: "1 hour ago",
    },
];
export default function IncidentsTable() {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>AI Confidence</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {incidents.map((incident) => (
                        <TableRow key={incident.id}>
                            <TableCell>{incident.id}</TableCell>

                            <TableCell>{incident.service}</TableCell>

                            <TableCell>
                                <SeverityBadge
                                    severity={incident.severity}
                                />
                            </TableCell>

                            <TableCell>
                                <StatusBadge
                                    status={incident.status}
                                />
                            </TableCell>

                            <TableCell>
                                {incident.confidence}%
                            </TableCell>

                            <TableCell>
                                {incident.createdAt}
                            </TableCell>

                            <TableCell>
                                <Link href={`/incidents/${incident.id}`}>
                                    <Button size="sm">
                                        View
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}