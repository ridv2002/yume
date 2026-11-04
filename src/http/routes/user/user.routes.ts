import { signUpSchema } from "../../../schemas";
import type { FastifyTypedInstance } from "../../../types/fastify-instance";
import { createUserController } from "../../controllers";

export const user = async (app: FastifyTypedInstance) => {
  app.post("/auth/signup", {
        schema: {
            description: "Create User.",
            tags: ["auth"],
            body: signUpSchema
        },
    },
    createUserController
  )
}
