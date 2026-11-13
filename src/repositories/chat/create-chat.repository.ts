import { chats } from "../../db/schemas";
import { db } from "../../db";

import type { CreateChatInput } from "../../schemas";


export class CreateChatRepository{

  async createChat(data: CreateChatInput) {

    const [chat] = await db.insert(chats).values(data).returning()

    if (!chat) {
      return null
    }

    return chat
  }
}
