import {
    MessageModel,
    IMessage,
} from "../models/message.model.js";

class MessageRepository {
    async create(
        data: Partial<IMessage>
    ) {
        return MessageModel.create(data);
    }

    async getRecentMessages(
        chatId: string,
        limit = 15
    ) {
        return MessageModel.find({
            chatId,
        })
            .sort({
                createdAt: -1,
            })
            .limit(limit);
    }

    async getMessages(
        chatId: string,
        cursor?: string,
        limit = 10
    ) {
        const query: any = {
            chatId,
        };

        if (cursor) {
            query._id = {
                $lt: cursor,
            };
        }

        return MessageModel.find(query)
            .sort({
                _id: -1,
            })
            .limit(limit);
    }

    async countMessages(
        chatId: string
    ) {
        return MessageModel.countDocuments({
            chatId,
        });
    }

    async deleteByChatId(
        chatId: string
    ) {
        return MessageModel.deleteMany({
            chatId,
        });
    }
}

export default new MessageRepository()