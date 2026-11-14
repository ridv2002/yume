import { env } from "../../configs/env";
import { geminiContentSchema, geminiResponseSchema } from "../../schemas";

export class GeminiClient {
  private readonly baseUrl: string;
  private readonly apiKey : string;

  constructor() {
    this.baseUrl = env.GEMINI_API_URL;
    this.apiKey  = env.GEMINI_API_KEY;
  }

  async generate(prompt: string, systemPrompt: string, model: string, resSchema: object) {
    console.log(model)
    const response = await fetch(
      `${this.baseUrl}/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": this.apiKey,
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              { text: systemPrompt },
            ],
          },

          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
              ],
            },
          ],

          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2400,

            responseMimeType: "application/json",

            responseSchema: resSchema
          },
        }),

        signal: AbortSignal.timeout(120000),
      }
    );

    console.log(response)

    if (!response.ok) {
      const error = await response.text();

      throw new Error(
        `Erro na API Gemini ${response.status}: ${error}`
      );
    }

    const json: unknown = await response.json();
    const data = geminiResponseSchema.parse(json);

    const candidate = data.candidates?.[0];

    if (candidate?.finishReason !== "STOP") {
      throw new Error(
        `Gemini não concluiu a resposta: ${
          candidate?.finishReason ?? "UNKNOWN"
        }`
      );
    }

    const rawContent = candidate.content?.parts
      .filter((part) => !part.thought)
      .map((part) => part.text ?? "")
      .join("");

    if (!rawContent) {
      throw new Error("Gemini retornou resposta vazia");
    }

    const parsed: unknown = JSON.parse(rawContent);

    const result = geminiContentSchema.parse(parsed);

    const memories = result.context.shouldSave
      ? result.context.memories
      : [];

    return {
      title: result.title,
      content: result.content,

      context: {
        shouldSave: memories.length > 0,
        memories,
      },

      usage: {
        prompt_tokens: data.usageMetadata?.promptTokenCount ?? 0,
        completion_tokens: data.usageMetadata?.candidatesTokenCount ?? 0,
        total_tokens: data.usageMetadata?.totalTokenCount ?? 0,
      },

      finishReason: candidate.finishReason,
    };
  }
}
