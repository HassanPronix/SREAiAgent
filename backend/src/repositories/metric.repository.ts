import { MetricModel } from "../models/metric.model.ts";

class MetricRepository {

    async create(metric: any) {
        return MetricModel.create(metric);
    }

    async findByMetric(metricName: string) {
        return MetricModel.find({ metricName });
    }

}

export const metricRepository = new MetricRepository()