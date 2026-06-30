import { ChatOpenAI } from "@langchain/openai";
import { intentPrompt } from "../prompts/intent.prompt.js";
import { IntentSchema } from "../schemas/intent.schema.js";
import { ChatState } from "../graph/chat.state.js";
import { llm } from "../services/llm/llm.service.js";

export async function IntentAgent(
    state: typeof ChatState.State
) {

    const chain = intentPrompt.pipe(llm.withStructuredOutput(IntentSchema));

    const result = await chain.invoke({
        message: state.userMessage
    });

    console.log(result);

    return {
        intent: result
    };

}