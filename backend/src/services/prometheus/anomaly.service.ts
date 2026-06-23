import { MetricEvent } from "../../interfaces/metric.interface.js";

export function detectAnomaly(metric: MetricEvent): MetricEvent | null {

    switch (metric.metricName) {

        case "cpu_usage":
            if (metric.value > 0.8) {
                return {
                    ...metric,
                    severity: "CRITICAL"
                };
            }
            break;

        case "memory_usage":
            if (metric.value > 0.85) {
                return {
                    ...metric,
                    severity: "CRITICAL"
                };
            }
            break;

        case "pod_restarts":
            if (metric.value > 3) {
                return {
                    ...metric,
                    severity: "WARN"
                };
            }
            break;

        default:
            return null;
    }

    return null;
}