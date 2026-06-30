import { ChatState } from "../graph/chat.state.js";
import { DatabaseService } from "../services/chat/database.service.js";
import { buildDatabaseContext } from "../utils/database-context-builder.js";

export async function DatabaseAgent(
    state: typeof ChatState.State
) {

    if (
        !state.intent?.requiresDatabase ||
        !state.intent.query ||
        state.intent.query.operation === "NONE"
    ) {

        return {
            databaseResult: null,
            databaseContext: ""
        };

    }

    const result = await DatabaseService.execute(
        state.intent.query
    );

    console.log('DB result --> ', { result, query: state.intent.query })

    return {
        databaseResult: result,
        databaseContext: buildDatabaseContext(result)
    };
}