import { startResourceWatcher } from "./k8s-watcher.js";

import { normalizeDeployment } from "../normalizers/deployment.normalizer.js";
import { normalizePod } from "../normalizers/pod.normalizer.js";
import { normalizeNode } from "../normalizers/k8s-node.normalizer.js";
import { normalizeK8sEvent } from "../normalizers/k8s-event.normalizer.js";

import { TOPICS } from "../kafka/topics.js";

export async function startWatchers() {

    await Promise.all([

        startResourceWatcher({
            path: "/apis/apps/v1/deployments",
            topic: TOPICS.DEPLOYMENT_EVENTS,
            resourceName: "deployment",
            normalize: normalizeDeployment,
        }),

        startResourceWatcher({
            path: "/api/v1/pods",
            topic: TOPICS.POD_EVENTS,
            resourceName: "pod",
            normalize: normalizePod,
        }),

        startResourceWatcher({
            path: "/api/v1/nodes",
            topic: TOPICS.NODE_EVENTS,
            resourceName: "node",
            normalize: (_, node) => normalizeNode(node),
        }),

        startResourceWatcher({
            path: "/api/v1/events",
            topic: TOPICS.K8S_EVENTS,
            resourceName: "event",
            normalize: (_, event) => normalizeK8sEvent(event),
        }),
    ]);
}