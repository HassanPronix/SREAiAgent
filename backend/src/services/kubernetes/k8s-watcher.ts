import * as k8s from '@kubernetes/client-node';
import { kubernetesService } from './kubernetes.service.js';
import { producerService } from '../kafka/producer.service.js';
import { logger } from '../../config/logger.js';

interface ResourceWatcherOptions<TResource, TPayload> {
  path: string;

  topic: string;

  resourceName: string;

  normalize: (phase: string, resource: TResource) => TPayload | Promise<TPayload>;
}

export async function startResourceWatcher<TResource, TPayload>({
  path,
  topic,
  resourceName,
  normalize,
}: ResourceWatcherOptions<TResource, TPayload>) {
  const watch = new k8s.Watch(kubernetesService.getConfig());

  logger.info(
    {
      service: 'kubernetes-watcher',

      resourceName,

      path,

      topic,
    },

    'Starting Kubernetes resource watcher',
  );

  try {
    await watch.watch(
      path,

      {},

      async (phase, resource) => {
        const receivedAt = new Date();

        try {
          logger.debug(
            {
              service: 'kubernetes-watcher',

              resourceName,

              phase,

              receivedAt,
            },

            'Kubernetes resource event received',
          );

          const normalized = await normalize(phase, resource as TResource);

          await producerService.publish(topic, normalized);

          logger.info(
            {
              resourceName,

              topic,

              phase,
            },

            'Kubernetes event published',
          );
        } catch (error) {
          logger.error(
            {
              err: error,

              service: 'kubernetes-watcher',

              component: 'resource-normalizer',

              incidentType: 'KUBERNETES_EVENT_PROCESSING_FAILURE',

              metadata: {
                resourceName,

                topic,

                phase,
              },
            },

            'Failed to process Kubernetes event',
          );
        }
      },

      (err) => {
        logger.error(
          {
            err,

            service: 'kubernetes-watcher',

            component: 'kubernetes-watch',

            incidentType: 'KUBERNETES_WATCH_FAILURE',

            metadata: {
              resourceName,
              path,
            },
          },

          'Kubernetes watcher failed',
        );
      },
    );
  } catch (error) {
    logger.fatal(
      {
        err: error,

        service: 'kubernetes-watcher',

        incidentType: 'KUBERNETES_WATCH_START_FAILURE',

        metadata: {
          resourceName,
          path,
        },
      },

      'Failed to start Kubernetes watcher',
    );

    throw error;
  }
}
