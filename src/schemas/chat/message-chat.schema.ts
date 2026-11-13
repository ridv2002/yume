import z from "zod"

const messageChatSchema = z.object({
  id: z.uuid(),
  chatId: z.uuid(),
  prompt: z.string()
})

export type MessageChatInput = z.infer<typeof messageChatSchema>;
