import { IMessage } from "../../models/message.model.js";

export interface RetrievedContext {
    content: string;
    score?: number;
    metadata?: Record<string, any>;
}

export interface BuildPromptInput {
    history: IMessage[];
    retrievedContext: RetrievedContext[];
    question: string;
}

export class PromptService {
    build({
        history,
        retrievedContext,
        question,
    }: BuildPromptInput) {
        const messages: {
            role: "system" | "user" | "assistant";
            content: string;
        }[] = [];

        messages.push({
            role: "system",
            content: this.buildSystemPrompt(retrievedContext),
        });

        history.forEach((message) => {
            if (message.role === "system") return;

            messages.push({
                role: message.role,
                content: message.content,
            });
        });

        messages.push({
            role: "user",
            content: question,
        });

        return messages;
    }

    private buildSystemPrompt(
        context: RetrievedContext[]
    ) {
        const formattedContext = context
            .map(
                (item, index) => `
Context ${index + 1}

${item.content}
`
            )
            .join("\n");

        return `
You are an expert Site Reliability Engineer.

Instructions:

- Answer only using the provided context.
- Use conversation history when resolving follow-up questions.
- If the context is insufficient, clearly state that.
- Do not fabricate incidents, logs, metrics, or root causes.
- Keep answers concise and actionable.

Retrieved Context

${formattedContext}
`;
    }
}