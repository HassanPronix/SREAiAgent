export function buildIncidentContext(
    incidents: any[]
) {

    if (!incidents.length) {
        return "";
    }

    let context = "=== Similar Historical Incidents ===\n\n";

    incidents.forEach((incident, index) => {

        context += `Incident ${index + 1}\n`;

        context += `Score: ${incident.score}\n`;

        context += incident.content;

        context += "\n\n---------------------\n\n";

    });

    return context;

}