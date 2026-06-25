
import crypto from "crypto";

import { fetchRecentEvents } from "./correlation.service.js";

import {
    detectDeploymentRegression,
    detectMemoryLeak,
    detectPodInstability,
} from "./incident-rules.service.js";

import { incidentRepository }
    from "../../repositories/incident.repository.js";

export async function generateIncidents() {

    const events = await fetchRecentEvents();

    const rules = [
        detectDeploymentRegression,
        detectMemoryLeak,
        detectPodInstability,
    ];

    for (const rule of rules) {

        const incident = rule(events);

        if (!incident) continue;

        const existing = await incidentRepository.findOpenIncident(events[0]?.namespace, events[0]?.service);

        if (existing) continue;

        await incidentRepository.create({
            incidentId: crypto.randomUUID(),

            ...incident,

            namespace: events[0]?.namespace,

            service: events[0]?.service,

            startedAt: new Date(),

            relatedEventIds: events.map(e => e._id),
        });
    }
}