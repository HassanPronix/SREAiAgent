import { K8sEvent } from "../../interfaces/k8s-event.interface.js";

export function normalizeK8sEvent(event: any): K8sEvent {

    let severity: K8sEvent["severity"] = "INFO";

    if (event.type === "Warning") {
        severity = "ERROR";
    }

    if ([
        "BackOff",
        "FailedScheduling",
        "Evicted",
        "NodeNotReady",
        "OOMKilled",
        "ImagePullBackOff",
    ].includes(event.reason)
    ) {
        severity = "CRITICAL";
    }

    return {
        timestamp: new Date(),

        source: "kubernetes",

        namespace: event.metadata?.namespace,

        kind: event.involvedObject?.kind,

        resourceName: event.involvedObject?.name,

        reason: event.reason,

        message: event.message,

        type: event.type,

        severity,

        metadata: event,
    };
}