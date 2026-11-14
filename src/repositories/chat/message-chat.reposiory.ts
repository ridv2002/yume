import { messageChat } from "../../db/schemas";
import { db } from "../../db";

import type { MessageChatInput } from "../../schemas";


export class MessageChatRepository{

    async createMessage(data: MessageChatInput) {

    const [message] = await db.insert(messageChat).values(data).returning()

    return message ?? null
  }
}
