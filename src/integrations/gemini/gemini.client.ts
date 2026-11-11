
import { env } from "../../configs/env";
import { geminiContentSchema, geminiResponseSchema } from "../../schemas";



const systemPrompt = `
Você é um assistente de IA com memória persistente.

Responda sempre em português brasileiro.

REGRAS:
1. content contém a resposta ao usuário.
2. memories contém fatos duradouros sobre o usuário.
3. Memorize projetos, preferências e objetivos.
4. Não memorize cumprimentos ou perguntas genéricas.
5. Não invente informações sobre o usuário.
6. Não memorize informações criadas pelo assistente.
7. Se não houver memórias, use shouldSave false.
8. Se houver memórias, use shouldSave true.
9. Retorne somente JSON válido.

Exemplo:
Usuário: Estou criando o projeto Yume com TypeScript.

Resposta:
{
  "content": "Legal! Como posso ajudar com o Yume?",
  "context": {
    "shouldSave": true,
    "memories": [
      "O usuário desenvolve o projeto Yume com TypeScript."
    ]
  }
}
`;

export class GeminiClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    this.baseUrl = (
      env.GEMINI_API_URL ??
      "https://generativelanguage.googleapis.com/v1beta"
    ).replace(/\/$/, "");

    this.apiKey = env.GEMINI_API_KEY;
    this.model = env.GEMINI_MODEL ?? "gemini-2.5-flash";
  }

  async generate(prompt: string) {
    const response = await fetch(
      `${this.baseUrl}/models/${this.model}:generateContent`,
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

            responseSchema: {
              type: "OBJECT",
              properties: {
                content: {
                  type: "STRING",
                },
                context: {
                  type: "OBJECT",
                  properties: {
                    shouldSave: {
                      type: "BOOLEAN",
                    },
                    memories: {
                      type: "ARRAY",
                      items: {
                        type: "STRING",
                      },
                    },
                  },
                  required: [
                    "shouldSave",
                    "memories",
                  ],
                },
              },
              required: [
                "content",
                "context",
              ],
            },
          },
        }),

        signal: AbortSignal.timeout(120000),
      }
    );

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
      content: result.content,

      context: {
        shouldSave: memories.length > 0,
        memories,
      },

      usage: {
        prompt_tokens:
          data.usageMetadata?.promptTokenCount ?? 0,

        completion_tokens:
          data.usageMetadata?.candidatesTokenCount ?? 0,

        total_tokens:
          data.usageMetadata?.totalTokenCount ?? 0,
      },

      finishReason: candidate.finishReason,
    };
  }
}
