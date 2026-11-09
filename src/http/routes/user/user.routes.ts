

/*
  Tem que fazer as rotas da get, update e delete
*/

import type { FastifyTypedInstance } from "../../../types/fastify-instance";

import { makeVerifyAuthMiddleware } from "../../../factories/auth-middleware";
import { signInSchema, signUpSchema, updateUserSchema } from "../../../schemas";
import {
  createUserController,
  updateUserController,
  loginUserController,
  profileUserController
} from "../../controllers";

export const user = async (app: FastifyTypedInstance) => {

  const verifyAuth = makeVerifyAuthMiddleware(app);

  app.post("/api/auth", {
        schema: {
            description: "Create User.",
            tags: ["auth" , "user"],
            body: signUpSchema
        },
    },
    createUserController
  )

  app.post("/api/auth/login", {
        schema: {
            description: "Entrar com usuario existente",
            tags: ["auth", "user"],
            body: signInSchema
        },
    },
    loginUserController
  )

  app.put("/api/auth", {
        preHandler: [verifyAuth.handle.bind(verifyAuth)],
        schema: {
            description: "Atuarlizar dados do usuario.",
            tags: ["auth", "user"],
            body: updateUserSchema
        },
    },
    updateUserController
  )

  app.get("/api/profile", {
        preHandler: [verifyAuth.handle.bind(verifyAuth)],
        schema: {
            description: "Profile do usuario ",
            tags: ["user"],
        },
    },
    profileUserController
  )
}
