import { ChatState } from "../graph/chat.state.js"

import { IncidentRetrievalService } from "../services/chat/incident-retrieval.service.js";

import { buildIncidentContext } from "../utils/incident-context-builder.js";

export async function IncidentAgent(
    state: typeof ChatState.State
) {

    if (!state.intent?.requiresIncidentSearch) {

        return {

            incidentResults: [],

            incidentContext: ""
        };
    }

    const incidents = await IncidentRetrievalService.retrieve(state.userMessage);

    return {

        incidentResults: incidents,

        incidentContext: buildIncidentContext(incidents)

    };

}