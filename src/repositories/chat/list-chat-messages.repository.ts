import { count, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { messageChat } from "../../db/schemas";
import type { PaginationInput } from "../../schemas/chat/pagination-chat.schama";


export class ListChatMessagesRepository{

  async listMessages(id: string, pagination: PaginationInput) {

    const {page , limit} = pagination

    const offset = (page - 1) * limit

    const [messages, totalResult] = await Promise.all([
      // messages
      db.query.messageChat.findMany({
        where: eq(messageChat.chatId, id),
        orderBy: desc(messageChat.id),

        limit,
        offset
      }),

      // totalResult
      db.select({
        total: count()
      }).from(messageChat)
      .where(eq(messageChat.chatId , id))
    ])

    const total = totalResult[0].total;

    console.log({
      total: total,
      totalR: totalResult[0].total
    })

    const totalPages = Math.ceil(total / limit)

    const hasNextPage = page * limit < total

    if (!messages && !totalResult) {
      return null
    }

    return {
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage: page > 1
      }
    };
  }
}
