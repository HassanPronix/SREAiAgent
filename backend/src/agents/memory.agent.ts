import  messageRepository from "../repositories/message.repository.js";
import { ChatMemoryService } from "../services/chat/chat-memory.service.js";
import { ChatState } from "../graph/chat.state.js";
import { buildConversationContext } from "../utils/context-builder.js";

export async function MemoryAgent(
    state: typeof ChatState.State
) {

    const recentMessages = await messageRepository.getRecentMessages(state.chatId, 10);

    const semanticMemories = state.intent?.requiresMemory ? await ChatMemoryService.search(
        state.chatId,
        state.userMessage
    ) : [];

    const conversationContext = buildConversationContext(recentMessages, semanticMemories);

    return {
        recentMessages,
        semanticMemories,
        conversationContext
    };

}