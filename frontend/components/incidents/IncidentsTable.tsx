import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

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

import { Incident } from "@/types/incident";

interface IncidentsTableProps {
    incidents: Incident[];
}

export default function IncidentsTable({
    incidents,
}: IncidentsTableProps) {
    return (
        <div className="rounded-lg border  overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Incident ID</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>AI Confidence</TableHead>
                        <TableHead>Occurred</TableHead>
                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {incidents.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="h-24 text-center"
                            >
                                No incidents found
                            </TableCell>
                        </TableRow>
                    ) : (
                        incidents.map((incident) => (
                            <TableRow key={incident.incidentId}>
                                <TableCell className="font-medium">
                                    {incident.incidentId.slice(0, 8)}...
                                </TableCell>

                                <TableCell>
                                    {incident.source}
                                </TableCell>

                                <TableCell>
                                    {incident.resourceName || "-"}
                                </TableCell>

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
                                    {incident.aiAnalysis?.confidence
                                        ? `${incident.aiAnalysis.confidence}%`
                                        : "-"}
                                </TableCell>

                                <TableCell>
                                    {formatDistanceToNow(
                                        new Date(incident.occurredAt),
                                        { addSuffix: true }
                                    )}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Link
                                        href={`/incidents/${incident.incidentId}`}
                                    >
                                        <Button size="sm">
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}