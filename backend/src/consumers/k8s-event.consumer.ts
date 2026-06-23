import { ConsumerService } from "../services/kafka/consumer.service.js";

import { TOPICS } from "../services/kafka/topics.js";

import { K8sEventModel } from "../models/k8s-event.model.js";

const consumer = new ConsumerService("k8s-event-group");

export async function startK8sEventConsumer() {

    await consumer.connect();

    await consumer.subscribe(
        TOPICS.K8S_EVENTS
    );

    await consumer.run(async (message) => {
        
        const payload = JSON.parse(message);

        await K8sEventModel.create(
            payload
        );
    }
    );
}