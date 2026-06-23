import cron from "node-cron";

import { producerService } from "../kafka/producer.service.js";
import { TOPICS } from "../kafka/topics.js";
import { prometheusService } from "./prometheus.service.js";
import { logger } from "../../config/logger.js";


export function startMetricsCollector() {

    cron.schedule("*/1 * * * *", async () => {

        try {

            const cpuResults =
                await prometheusService.query(
                    "sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)"
                );


            await producerService.publish(
                TOPICS.METRICS,
                {
                    metricName: "cpu_usage",
                    timestamp: new Date(),
                    data: cpuResults
                }
            );


            logger.info(
                "Published raw CPU metrics"
            );


        } catch (error) {

            logger.error(error);

        }

    });

}