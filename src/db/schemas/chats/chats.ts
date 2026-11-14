import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { user } from "../";

export const chats = pgTable("chats", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => user.id),

  title: text("title").notNull(),
});

export const messageChat = pgTable("message_chat", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  chatId: uuid("chat_id")
    .notNull()
    .references(() => chats.id),

  prompt: text("prompt").notNull(),

  response: text("response").notNull(),
});
