import type { FastifyReply, FastifyRequest } from "fastify";
import { GeminiClient } from "../../../integrations/gemini/gemini.client";
import { GeminiService } from "../../../services/generate/generate.service";

export async function generateController(req: FastifyRequest<{ Body: { prompt: string } }>, rep: FastifyReply) {

  const geminiClient = new GeminiClient()
  const service = new GeminiService(geminiClient);

  try {

    const { prompt } = req.body

    const result = await service.execute(prompt);

    return rep.status(200).send(result);

  } catch (err) {
    return rep.status(401).send({
      message: "Error ao gerar message"
    });
  }
}
