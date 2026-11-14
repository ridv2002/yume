import type { FastifyReply, FastifyRequest } from "fastify";
import { GeminiClient } from "../../../integrations/gemini/gemini.client";
import { GeminiService } from "../../../services/generate/generate.service";
import type { ChatInput } from "../../../schemas";
import { MessageChatService } from "../../../services/chat/message-chat.service";
import { CreateChatRepository } from "../../../repositories/chat/create-chat.repository";
import { MessageChatRepository } from "../../../repositories/chat/message-chat.reposiory";

export async function generateController(
  req: FastifyRequest<{ Body: ChatInput }>,
  rep: FastifyReply
) {
  const geminiClient = new GeminiClient();
  const geminiService = new GeminiService(geminiClient);

  const createChatRepo = new CreateChatRepository();
  const messageChatRepo = new MessageChatRepository();

  const messageChatService = new MessageChatService(
    geminiService,
    createChatRepo,
    messageChatRepo
  );

  try {
    const { ownerId, prompt, chatId } = req.body;

    const data = await messageChatService.execute({
      ownerId,
      prompt,
      chatId
    });

    return rep.status(200).send(data);

  }catch (err) {
    req.log.error(err);

    if (err instanceof Error) {
      console.error("Mensagem:", err.message);
      console.error("Stack:", err.stack);
    } else {
      console.error("Erro desconhecido:", err);
    }

    return rep.status(500).send({
      message: "Erro ao gerar mensagem",
      error: err instanceof Error ? err.message : String(err)
    });
  }
}
