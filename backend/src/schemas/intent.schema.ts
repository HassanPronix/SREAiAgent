import { z } from "zod";

export const IntentSchema = z.object({

    intent: z.enum([
        "GENERAL_CHAT",
        "CHAT_MEMORY",
        "INCIDENT_SEARCH",
        "LATEST_INCIDENT",
        "INCIDENT_DETAILS",
        "METRICS_QUERY",
        "ACTION_RECOMMENDATION"
    ]),

    requiresMemory: z.boolean(),

    requiresIncidentSearch: z.boolean(),

    requiresDatabase: z.boolean(),

    confidence: z.number().min(0).max(1),

    query: z.object({

        operation: z.enum([
            "NONE",
            "FIND_ONE",
            "FIND_MANY",
            "COUNT"
        ]),

        filters: z.object({

            incidentId: z.string().nullable(),

            severity: z.enum([
                "INFO",
                "WARNING",
                "CRITICAL"
            ]).nullable(),

            namespace: z.string().nullable(),

            resourceName: z.string().nullable(),

            service: z.string().nullable(),

            status: z.enum([
                "OPEN",
                "CLOSED"
            ]).nullable(),

            source: z.string().nullable(),

            timeRange: z.string().nullable()

        }),

        sort: z.object({

            field: z.enum([
                "occurredAt",
                "createdAt",
                "updatedAt"
            ]).nullable(),

            direction: z.enum([
                "ASC",
                "DESC"
            ]).nullable()

        }),

        limit: z.number().int().min(1).max(100).default(10)

    })

});

export type Intent = z.infer<typeof IntentSchema>;