import * as k8s from "@kubernetes/client-node";
import { kubernetesService } from "./kubernetes.service.js";
import { producerService } from "../kafka/producer.service.js";
import { logger } from "../../config/logger.js";

interface ResourceWatcherOptions<TResource, TPayload> {
    path: string;
    topic: string;
    resourceName: string;
    normalize: (phase: string, resource: TResource) => TPayload | Promise<TPayload>;
}

export async function startResourceWatcher<TResource, TPayload>({ path, topic, resourceName, normalize, }: ResourceWatcherOptions<TResource, TPayload>) {

    const watch = new k8s.Watch(kubernetesService.getConfig());

    logger.info(`Starting ${resourceName} watcher`);

    await watch.watch(
        path,
        {},
        async (phase, resource) => {
            try {
                const normalized = await normalize(phase, resource as TResource);

                await producerService.publish(topic, normalized);

            } catch (error) {

                logger.error({ error, resourceName, });
            }
        },

        (err) => {

            logger.error({ err, resourceName, });
        }
    );
}