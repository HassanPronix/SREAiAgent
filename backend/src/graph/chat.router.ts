import { ChatState } from "./chat.state.js";

export function routeFromIntent(
    state: typeof ChatState.State
): string[] {

    const routes: string[] = [];

    if (state.intent?.requiresMemory) {
        routes.push("memory");
    }

    if (state.intent?.requiresIncidentSearch) {
        routes.push("incident");
    }

    if (
        state.intent?.requiresDatabase &&
        state.intent.query.operation !== "NONE"
    ) {
        routes.push("database");
    }

    if (routes.length === 0) {
        routes.push("response");
    }

    console.log('routes --> ', routes)
    return routes;
}