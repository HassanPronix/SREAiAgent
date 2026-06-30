import { Annotation } from "@langchain/langgraph";
import type { Intent } from "../schemas/intent.schema.js";

export const ChatState = Annotation.Root({
    chatId: Annotation<string>(),

    userMessage: Annotation<string>(),

    intent: Annotation<Intent | null>(),

    memories: Annotation<any[]>(),

    incidents: Annotation<any[]>(),

    answer: Annotation<string>(),

    recentMessages: Annotation<any[]>({
        value: (_, next) => next,
        default: () => [],
    }),

    semanticMemories: Annotation<any[]>({
        value: (_, next) => next,
        default: () => [],
    }),

    conversationContext: Annotation<string>({
        value: (_, next) => next,
        default: () => "",
    }),

    incidentResults: Annotation<any[]>({
        value: (_, next) => next,
        default: () => [],
    }),

    incidentContext: Annotation<string>({
        value: (_, next) => next,
        default: () => "",
    }),

    databaseResult: Annotation<any>({
        value: (_, next) => next,
        default: () => null
    }),

    databaseContext: Annotation<string>({
        value: (_, next) => next,
        default: () => ""
    }),
});

export type ChatStateType = typeof ChatState.State;