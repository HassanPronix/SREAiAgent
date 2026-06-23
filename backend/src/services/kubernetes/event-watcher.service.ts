import * as k8s from "@kubernetes/client-node";

import { logger } from "../../config/logger.js";

import { kubernetesService } from "./kubernetes.service.js";

import { producerService } from "../kafka/producer.service.js";

import { TOPICS } from "../kafka/topics.js";

import { normalizeK8sEvent } from "../normalizers/k8s-event.normalizer.js";

export async function startEventWatcher() {

    const watch = new k8s.Watch(kubernetesService.getConfig());

    logger.info("Starting Kubernetes event watcher");

    await watch.watch("/api/v1/events", {},
        async (_phase, event) => {

            try {

                const normalized = normalizeK8sEvent(event);

                await producerService.publish(
                    TOPICS.K8S_EVENTS,
                    normalized
                );

            } catch (error) {

                logger.error({
                    error
                });

            }
        },

        (err) => {

            logger.error({ err });
        }
    );
}