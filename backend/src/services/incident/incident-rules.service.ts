
export function detectDeploymentRegression(events: any[]) {

    const deploymentEvents = events.filter(e => e.eventType === "deployment_event");

    const anomalies = events.filter(e => e.eventType === "metric_anomaly");

    const errors = events.filter(e => e.severity === "ERROR" || e.severity === "CRITICAL");

    if (deploymentEvents.length > 0 && anomalies.length > 0 && errors.length > 0) {
        return {
            title: "Possible Deployment Regression",

            description: "Critical events detected after deployment",

            severity: "HIGH",

            probableRootCause: "Recent deployment rollout",

            recommendation: "Review latest deployment and consider rollback",
        };
    }

    return null;
}

export function detectMemoryLeak(events: any[]) {

    const memoryAnomalies = events.filter(e => e.eventType === "metric_anomaly" && e.metadata?.metricName === "memory_usage");

    const oomEvents = events.filter(e => e.title === "OOMKilled");

    if (memoryAnomalies.length && oomEvents.length) {
        return {
            title: "Possible Memory Leak",

            description: "OOM events and memory anomalies detected",

            severity: "CRITICAL",

            probableRootCause: "Application memory leak",

            recommendation: "Inspect heap usage and restart affected pods",
        };
    }

    return null;
}

export function detectPodInstability(events: any[]) {

    const podRestarts = events.filter(e => e.eventType === "pod_event" && e.metadata?.restartCount > 3);

    if (podRestarts.length) {
        return {
            title: "Pod Instability Detected",

            description: "Multiple pod restarts detected",

            severity: "HIGH",

            probableRootCause: "Application crashes or readiness failures",

            recommendation: "Inspect container logs and health probes",
        };
    }

    return null;
}