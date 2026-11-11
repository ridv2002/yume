import z from "zod";

// Resposta nativa da API Gemini
export const geminiResponseSchema = z.object({
  candidates: z.array(
    z.object({
      content: z.object({
        parts: z.array(
          z.object({
            text: z.string().optional(),
            thought: z.boolean().optional(),
          })
        ),
      }).optional(),
      finishReason: z.string().optional(),
    })
  ).optional(),

  usageMetadata: z.object({
    promptTokenCount: z.number().optional(),
    candidatesTokenCount: z.number().optional(),
    totalTokenCount: z.number().optional(),
  }).optional(),
});

export const geminiContentSchema = z.object({
  content: z.string(),

  context: z.object({
    shouldSave: z.boolean(),
    memories: z.array(z.string()),
  }),
});

export type GeminiContent = z.infer<typeof geminiContentSchema>;
