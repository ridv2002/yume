import z from "zod"

const createChatSchema = z.object({
  ownerId: z.uuid(),
  chatId: z.uuid().optional(),
  title: z.string()
})

export type CreateChatInput = z.infer<typeof createChatSchema>;
