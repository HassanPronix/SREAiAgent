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
      event: 'kubernetes_watcher_started',

      metadata: {
        component: 'kubernetes-watch',

        resourceName,

        path,

        topic,
      },
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
              event: 'kubernetes_event_received',

              metadata: {
                component: 'kubernetes-watch',

                resourceName,

                phase,

                receivedAt,
              },
            },

            'Kubernetes resource event received',
          );

          const normalized = await normalize(phase, resource as TResource);

          await producerService.publish(topic, normalized);

          logger.info(
            {
              event: 'kubernetes_event_published',

              metadata: {
                resourceName,

                topic,

                phase,
              },
            },

            'Kubernetes event published',
          );
        } catch (error) {
          logger.error(
            {
              event: 'kubernetes_event_processing_failed',

              err: error,

              metadata: {
                component: 'resource-normalizer',

                incidentType: 'KUBERNETES_EVENT_PROCESSING_FAILURE',

                resourceName,

                topic,

                phase,
              },
            },

            'Failed to process Kubernetes event',
          );
        }
      },

      err => {
        logger.error(
          {
            event: 'kubernetes_watch_failed',

            err,

            metadata: {
              component: 'kubernetes-watch',

              incidentType: 'KUBERNETES_WATCH_FAILURE',

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
        event: 'kubernetes_watch_start_failed',

        err: error,

        metadata: {
          component: 'kubernetes-watch',

          incidentType: 'KUBERNETES_WATCH_START_FAILURE',

          resourceName,

          path,
        },
      },

      'Failed to start Kubernetes watcher',
    );

    throw error;
  }
}
