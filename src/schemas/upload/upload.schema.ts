import { z } from "zod";

export const getUploadUrlSchema = z.object({
  fileName: z.string().min(1, "Nome do arquivo obrigatório"),
});

export const getUploadUrlResponseSchema = z.object({
  singendUrl : z.url()
});

export type GetUploadUrlInput = z.infer<typeof getUploadUrlSchema>;
export type GetUploadUrlResponse = z.infer<typeof getUploadUrlResponseSchema>;
