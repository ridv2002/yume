export const geminiResponseNoChatId = {
  type: "OBJECT",
  properties: {
    title: {
      type: "STRING",
      description: "Título curto que representa o assunto da conversa."
    },
    content: {
      type: "STRING"
    },
    context: {
      type: "OBJECT",
      properties: {
        shouldSave: {
          type: "BOOLEAN"
        },
        memories: {
          type: "ARRAY",
          items: {
            type: "STRING"
          }
        }
      },
      required: ["shouldSave", "memories"]
    }
  },
  required: ["title", "content", "context"]
};


export const geminiResponseWithChatId = {
  type: "OBJECT",
  properties: {
    title: {
      type: "STRING",
      description: "Título curto que representa o assunto da conversa."
    },
    content: {
      type: "STRING"
    },
    context: {
      type: "OBJECT",
      properties: {
        shouldSave: {
          type: "BOOLEAN"
        },
        memories: {
          type: "ARRAY",
          items: {
            type: "STRING"
          }
        }
      },
      required: ["shouldSave", "memories"]
    }
  },
  required: ["title", "content", "context"]
};
