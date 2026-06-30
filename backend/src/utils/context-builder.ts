export function buildConversationContext(
    recentMessages: any[],
    semanticMemories: any[]
) {

    let context = "";

    context += "=== Recent Conversation ===\n\n";

    for (const msg of recentMessages) {

        context += `${msg.role}: ${msg.content}\n`;

    }

    if (semanticMemories.length) {

        context += "\n=== Relevant Previous Conversation ===\n\n";

        for (const memory of semanticMemories) {

            context += memory.pageContent + "\n\n";

        }

    }

    return context;

}