export function buildIncidentSummary(incident: any): string {
  return `
            Title: ${incident.title}
            
            Severity: ${incident.severity}
            
            Namespace: ${incident.namespace}
            
            Service: ${incident.service}
            
            Description:
            ${incident.description}
            
            Probable Root Cause:
            ${incident.probableRootCause}
            
            Final Root Cause:
            ${incident.rootCause}
            
            Resolution:
            ${incident.recommendation}
            `;
}
