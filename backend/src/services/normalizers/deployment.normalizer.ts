import { DeploymentEvent } from '../../interfaces/deployment-event.interface.js';

export function normalizeDeployment(phase: string, deployment: any): DeploymentEvent {
  const container = deployment.spec?.template?.spec?.containers?.[0];

  return {
    timestamp: new Date(),

    source: 'kubernetes',

    namespace: deployment.metadata?.namespace,

    deploymentName: deployment.metadata?.name,

    replicas: deployment.spec?.replicas,

    availableReplicas: deployment.status?.availableReplicas,

    readyReplicas: deployment.status?.readyReplicas,

    generation: deployment.metadata?.generation,

    image: container?.image,

    phase,

    metadata: deployment,
  };
}
