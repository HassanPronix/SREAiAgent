import { ObservabilityEventModel } from "../../models/observability-event.model.js";

export async function fetchRecentEvents() {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    return ObservabilityEventModel.find({
        timestamp: {
            $gte: fifteenMinutesAgo,
        },
    }).sort({
        timestamp: -1,
    });
}