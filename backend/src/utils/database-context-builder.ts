export function buildDatabaseContext(result: any): string {

    if (!result) {

        return "";
    }

    if (Array.isArray(result)) {

        let context = "=== Database Results ===\n\n";

        result.forEach((incident, index) => {

            context += `
Incident ${index + 1}

Incident ID : ${incident.incidentId}

Title : ${incident.title}

Severity : ${incident.severity}

Status : ${incident.status}

Namespace : ${incident.namespace}

Resource : ${incident.resourceName}

Occurred : ${incident.occurredAt}

Message : ${incident.message}

---------------------------

`;

        });

        return context;
    }

    if ("total" in result) {

        return `
Total Incidents

${result.total}
`;
    }

    return `

Latest Incident

Incident ID : ${result.incidentId}

Title : ${result.title}

Severity : ${result.severity}

Status : ${result.status}

Namespace : ${result.namespace}

Resource : ${result.resourceName}

Occurred : ${result.occurredAt}

Message : ${result.message}

AI Summary

${result.aiAnalysis?.summary ?? ""}

Root Cause

${result.aiAnalysis?.rootCause ?? ""}

`;
}