import IncidentModel from "../../models/incident.model.js";

import type { Intent } from "../../schemas/intent.schema.js";

type DatabaseQuery = Intent["query"];

export class DatabaseService {

    static async execute(query: DatabaseQuery) {

        const filter: any = {};

        if (query.filters.incidentId) {
            filter.incidentId = query.filters.incidentId;
        }

        if (query.filters.severity) {
            filter.severity = query.filters.severity;
        }

        if (query.filters.namespace) {
            filter.namespace = query.filters.namespace;
        }

        if (query.filters.resourceName) {
            filter.resourceName = query.filters.resourceName;
        }

        if (query.filters.status) {
            filter.status = query.filters.status;
        }

        if (query.filters.source) {
            filter.source = query.filters.source;
        }

        switch (query.operation) {

            case "FIND_ONE":

                return await IncidentModel
                    .findOne(filter)
                    .sort({
                        [query.sort.field ?? "occurredAt"]:
                            query.sort.direction === "ASC" ? 1 : -1
                    })
                    .lean();

            case "FIND_MANY":

                return await IncidentModel
                    .find(filter)
                    .sort({
                        [query.sort.field ?? "occurredAt"]:
                            query.sort.direction === "ASC" ? 1 : -1
                    })
                    .limit(query.limit ?? 10)
                    .lean();

            case "COUNT":

                return {
                    total: await IncidentModel.countDocuments(filter)
                };

            default:

                return null;
        }

    }

}