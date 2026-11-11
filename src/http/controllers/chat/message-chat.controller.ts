import type { FastifyReply, FastifyRequest } from "fastify";
import { GeminiClient } from "../../../integrations/gemini/gemini.client";
import { GeminiService } from "../../../services/generate/generate.service";

export async function generateController(
  req: FastifyRequest<{ Body: { prompt: string } }>,
  rep: FastifyReply
) {
  const service = new GeminiService(new GeminiClient());

  const result = await service.execute(req.body.prompt);

  return rep.send(result);
}
