import { PodEvent } from "../../interfaces/pod-event.interface.js";

export function normalizePod(phase: string, pod: any): PodEvent {
    const status = pod.status?.containerStatuses?.[0];

    return {

        timestamp: new Date(),

        source: "kubernetes",

        namespace: pod.metadata?.namespace,

        podName: pod.metadata?.name,

        nodeName: pod.spec?.nodeName,

        phase,

        restartCount:
            status?.restartCount || 0,

        ready:
            status?.ready || false,

        podIP: pod.status?.podIP,

        hostIP: pod.status?.hostIP,

        status:
            pod.status?.phase,

        metadata: pod
    };
}