import z from "zod";

const messageChatSchema = z.object({
  chatId: z.uuid(),
  prompt: z.string(),
  response: z.string(),
});

export type MessageChatInput = z.infer<typeof messageChatSchema>;
