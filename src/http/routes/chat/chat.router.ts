import { generateController} from "../../controllers";

import type { FastifyTypedInstance } from "../../../types/fastify-instance";
import { chatSchema } from "../../../schemas";
//import { makeVerifyAuthMiddleware } from "../../../factories/auth-middleware";


export const chat = async (app: FastifyTypedInstance) => {

  //const verifyAuth = makeVerifyAuthMiddleware(app);

  app.post("/api/chat", {
        schema: {
          description: "Create User.",
          tags: ["chat"],
          body: chatSchema
        }
      },
      generateController
  )
}
