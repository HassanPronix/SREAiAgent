import { ChatState } from "./chat.state.js";

export function routeFromIntent(
    state: typeof ChatState.State
): string[] {

    const routes: string[] = [];

    if (state.intent?.requiresMemory) {
        routes.push("memoryAgent");
    }

    if (state.intent?.requiresIncidentSearch) {
        routes.push("incidentAgent");
    }

    if (
        state.intent?.requiresDatabase &&
        state.intent.query.operation !== "NONE"
    ) {
        routes.push("databaseAgent");
    }

    if (routes.length === 0) {
        routes.push("responseAgent");
    }

    console.log('routes --> ', routes)
    return routes;
}