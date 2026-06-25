// src/services/incident/incident.scheduler.ts

import cron from "node-cron";

import { generateIncidents } from "./incident.service.js";

import { logger } from "../../config/logger.js";

export function startIncidentScheduler() {

    cron.schedule("*/1 * * * *", async () => {

        try {

            logger.info(
                "Running incident correlation"
            );

            await generateIncidents();

        } catch (error) {

            logger.error(error);

        }
    });
}