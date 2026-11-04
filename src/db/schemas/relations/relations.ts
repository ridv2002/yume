import { relations } from "drizzle-orm";
import { user } from "../../schemas";
import { chats } from "../chats/chats";

export const usersRelations = relations(user, ({ many }) => ({
  chats: many(chats),
}));


export const chatsRelations = relations(chats, ({ one }) => ({
  user: one(user, {
    fields: [chats.ownerId],
    references: [user.id],
  }),
}));
