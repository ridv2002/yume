import z from "zod"

export const chatSchema = z.object({
  ownerId: z.uuid(), // userId
  chatId: z.uuid().optional(),
  prompt : z.string()
})

export type ChatInput = z.infer<typeof chatSchema>;
