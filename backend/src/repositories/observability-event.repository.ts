import { ObservabilityEventModel } from "../models/observability-event.model.js";

class ObservabilityEventRepository {
    async create(payload: any) {
        return ObservabilityEventModel.create(payload);
    }

    async createMany(payloads: any[]) {
        return ObservabilityEventModel.insertMany(payloads);
    }
}

export const observabilityEventRepository = new ObservabilityEventRepository();