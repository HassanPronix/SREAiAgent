import cron from "node-cron";

import { producerService } from "../kafka/producer.service.js";
import { TOPICS } from "../kafka/topics.js";
import { prometheusService } from "./prometheus.service.js";
import { logger } from "../../config/logger.js";


export function startMetricsCollector() {


    logger.info(
        {
            service: "metrics-collector",
            interval: "1 minute"
        },
        "Metrics collector started"
    );



    cron.schedule(
        "*/1 * * * *",

        async () => {


            const startedAt =
                Date.now();



            try {


                const cpuResults = await prometheusService.query("sum(rate(container_cpu_usage_seconds_total[5m])) by (name)"
                );

                await producerService.publish(

                    TOPICS.METRICS,

                    {
                        metricName:
                            "cpu_usage",

                        timestamp:
                            new Date(),

                        data:
                            cpuResults
                    }

                );

                logger.info(
                    {
                        service: "metrics-collector",

                        metric: "cpu_usage",

                        duration: Date.now() - startedAt,

                        topic: TOPICS.METRICS

                    },

                    "Metrics collected and published"
                );



            } catch (error) {

                logger.error(
                    {
                        err: error,

                        service: "metrics-collector",

                        component: "prometheus-collector",

                        incidentType: "METRICS_COLLECTION_FAILURE",

                        metadata: {

                            metric: "cpu_usage",

                            topic: TOPICS.METRICS

                        }
                    },

                    "Failed to collect metrics"
                );

            }
        }
    );

}