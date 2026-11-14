import type { CreateChatRepository } from "../../repositories/chat/create-chat.repository";
import type { MessageChatRepository } from "../../repositories/chat/message-chat.reposiory";
import { geminiResponseNoChatId, geminiResponseWithChatId, type ChatInput } from "../../schemas";

import { randomUUID } from "node:crypto";
import { GeminiService } from "../generate/generate.service";
import { geminiPrompt } from "../../schemas/gemini/gemini-prompts";


const model = "gemini-2.5-flash-lite"


export class MessageChatService{

  private readonly createChatRepo: CreateChatRepository;
  private readonly messageChatRepo: MessageChatRepository;
  private readonly geminiService: GeminiService;

  constructor(
    geminiService: GeminiService,
    createChatRepo: CreateChatRepository,
    messageChatRepo: MessageChatRepository
  ){
    this.createChatRepo = createChatRepo
    this.messageChatRepo = messageChatRepo
    this.geminiService  = geminiService
  }

  async execute(data: ChatInput) {

    const geminiResponse = async (schema: object) => {
      const gemini = await this.geminiService.execute(data.prompt, schema, model, geminiPrompt)
      return gemini
    }

    if (!geminiResponse) {
      throw new Error("gemini_error");
    }

    let chatId = data.chatId;

    console.log(chatId)

    //Se o ChatId for null ele gera um uuid e salva no banco de dados

    if (!chatId) {
      const geminiData = geminiResponse(geminiResponseNoChatId)
      const chat = await this.createChatRepo.createChat({
        ownerId: data.ownerId,
        title: (await geminiData).title,
        chatId: randomUUID(),
      });

      if (!chat) {
        throw new Error("error_creating_chat");
      }

      chatId = chat.id;
    }

    const geminiData = geminiResponse(geminiResponseWithChatId)

    await this.messageChatRepo.createMessage({
      chatId,
      prompt: data.prompt,
      response: (await geminiData).content,
    });

    return {
      chatId,
      content: (await geminiData).content,
      title: (await geminiData).title
    };
  }
}
