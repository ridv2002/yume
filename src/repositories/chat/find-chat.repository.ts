import { eq } from "drizzle-orm";
import { db } from "../../db";
import { chats } from "../../db/schemas";


export class FindChat{

  async findChat(id: string) {

    const chat = await db.query.chats.findFirst({
      where: eq(chats.id , id)
    })

    if (!chat) {
      return null
    }

    return chat

  }

}
