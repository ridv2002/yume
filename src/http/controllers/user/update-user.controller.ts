import type { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserService } from "../../../services/user/update-user.service";
import { UpdateUserRepository } from "../../../repositories/user/update-user.repository";
import type { UpdateUserInput } from "../../../schemas";



const updateUserRepo = new UpdateUserRepository()
const updateUserService = new UpdateUserService(updateUserRepo)


export async function updateUserController(
  req: FastifyRequest<{ Body: UpdateUserInput }>, rep: FastifyReply): Promise<void>
{
  const { email, name, lastName, icon } = req.body

  const id = req.user.id

  try {
    await updateUserService.execute({ email, name , lastName , icon , id })
  } catch (err){
    if (err instanceof Error) {
      if (err.message == "user_not_found") {
        rep.status(400).send({
          message: "Error ao atualizar dados",
        })
      }
    }
  }

  rep.status(201).send({
    message: "Dados atualizados",
  })
}
