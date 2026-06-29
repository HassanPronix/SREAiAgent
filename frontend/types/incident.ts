export interface AIAnalysis {
    summary: string;
    rootCause: string;
    remediation: string[];
    confidence: number;
    explanation: string;
}

export interface SREResolution {
    resolvedBy: string;
    resolutionSummary: string;
    actualRootCause: string;
    actionsPerformed: string[];
    commandsExecuted: string[];
    preventiveMeasures: string;
    aiRecommendationUseful: "YES" | "NO" | "PARTIAL";
    additionalNotes: string;
    resolvedAt: string;
}

export interface Incident {
    _id: string;
    incidentId: string;
    title: string;
    severity: "INFO" | "WARNING" | "CRITICAL";
    status: "OPEN" | "CLOSED";

    source: string;
    resourceName: string;
    namespace: string;
    message: string;

    occurredAt: string;

    rawEvent: Record<string, any>;

    aiAnalysis?: AIAnalysis | null;

    similarIncidents: Incident[];

    sreResolution?: SREResolution | null;

    createdAt: string;
    updatedAt: string;
}

export interface IncidentApiResponse {
    success: boolean;
    data: Incident[];
}

export interface SingleIncidentResponse {
    success: boolean;
    data: Incident;
}