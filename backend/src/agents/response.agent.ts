import { responsePrompt } from "../prompts/response.prompt.js";
import { ChatState } from "../graph/chat.state.js";
import { llm } from "../services/llm/llm.service.js";

export async function ResponseAgent(
    state: typeof ChatState.State
) {

    const chain = responsePrompt.pipe(llm);

    const response = await chain.invoke({

        question: state.userMessage,

        conversationContext:
            state.conversationContext,

        incidentContext:
            state.incidentContext,

        databaseContext:
            state.databaseContext

    });

    return {

        answer: response.content

    };

}