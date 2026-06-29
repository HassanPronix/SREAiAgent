"use client";

import { useEffect } from "react";

import { sseService } from "@/services/sse.service";
import { useIncidentStore } from "@/store/incident-store";
import { Incident } from "@/types/incident";

export default function SSEProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const addIncident =
        useIncidentStore((state) => state.addIncident);

    const updateIncident =
        useIncidentStore((state) => state.updateIncident);

    useEffect(() => {
        const eventSource = sseService.connect();

        eventSource.addEventListener(
            "incident-created",
            (event: MessageEvent) => {
                const incident: Incident = JSON.parse(
                    event.data
                );

                addIncident(incident);
            }
        );

        eventSource.addEventListener(
            "enriched-incident",
            (event: MessageEvent) => {
                const incident: Incident = JSON.parse(
                    event.data
                );

                updateIncident(incident);
            }
        );

        return () => {
            eventSource.close();
        };
    }, [addIncident, updateIncident]);

    return children;
}