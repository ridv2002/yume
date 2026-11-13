import { relations } from "drizzle-orm";
import { user , chats , messageChat } from "../../schemas";

export const userRelation = relations(user, ({ many }) => ({
  chats: many(chats),
}));

export const chatsRelation = relations(chats, ({ one, many }) => ({
  owner: one(user, {
    fields: [chats.ownerId],
    references: [user.id],
  }),

  messages: many(messageChat),
}));

export const messageRelation = relations(messageChat, ({ one }) => ({
  chat: one(chats, {
    fields: [messageChat.chatId],
    references: [chats.id],
  }),
}));
