import { GeminiClient } from "../../integrations/gemini/gemini.client";

export class GeminiService {
  private readonly geminiClient: GeminiClient
  constructor(geminiClient: GeminiClient) {
    this.geminiClient = geminiClient
  }

  async execute(prompt: string) {
    return this.geminiClient.generate(prompt);
  }
}
