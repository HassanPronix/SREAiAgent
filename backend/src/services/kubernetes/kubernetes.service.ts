import * as k8s from "@kubernetes/client-node";

class KubernetesService {
    private kubeConfig: k8s.KubeConfig;

    constructor() {
        this.kubeConfig = new k8s.KubeConfig();

        try {
            this.kubeConfig.loadFromDefault();
        } catch {
            this.kubeConfig.loadFromCluster();
        }
    }

    getConfig() {
        return this.kubeConfig;
    }

    getCoreApi() {
        return this.kubeConfig.makeApiClient(
            k8s.CoreV1Api
        );
    }
}

export const kubernetesService = new KubernetesService();