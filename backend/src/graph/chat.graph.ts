import { StateGraph, START, END } from "@langchain/langgraph";

import { ChatState } from "./chat.state.js";

import { IntentAgent } from "../agents/intent.agent.js";
import { MemoryAgent } from "../agents/memory.agent.js";
import { IncidentAgent } from "../agents/incident.agent.js";
import { DatabaseAgent } from "../agents/database.agent.js";
import { ResponseAgent } from "../agents/response.agent.js";
import { routeFromIntent } from "./chat.router.js";

export const ChatGraph = new StateGraph(ChatState)

    .addNode("intentAgent", IntentAgent)

    .addNode("memoryAgent", MemoryAgent)

    .addNode("incidentAgent", IncidentAgent)

    .addNode("databaseAgent", DatabaseAgent)

    .addNode("responseAgent", ResponseAgent)

    .addEdge(START, "intentAgent")

    .addConditionalEdges("intentAgent", routeFromIntent)

    .addEdge("memoryAgent", "responseAgent")

    .addEdge("incidentAgent", "responseAgent")

    .addEdge("databaseAgent", "responseAgent")

    .addEdge("responseAgent", END)

    .compile();