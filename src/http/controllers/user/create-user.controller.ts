import type { FastifyReply, FastifyRequest } from "fastify";
import type { SignUpInput } from "../../../schemas";
import { CreateUserService } from "../../../services";
import { CreateUserRepository , FindUserRepository } from "../../../repositories";

const createUserRepo = new CreateUserRepository()
const findUserRepo = new FindUserRepository()

const createUserService = new CreateUserService( createUserRepo , findUserRepo)

export async function createUserController(req: FastifyRequest<{Body: SignUpInput}> , rep : FastifyReply): Promise <void> {

  const { email, name, lastName, icon, password, age } = req.body

  try {
    await createUserService.execute({ email, name , lastName , icon , password , age })
  } catch (err){
    if (err instanceof Error) {
      if (err.message == "error_create_acount") {
        rep.status(500).send({
          message: "Error ao criar conta",
        })
      }
      if (err.message == "email_already_exists") {
        rep.status(409).send({
          message: "Error ao criar conta email em uso",
        })
      }
    }
  }

  rep.status(201).send({
    message: "User created",
    email
  })

}
