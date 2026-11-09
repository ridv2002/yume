import type { FastifyReply, FastifyRequest } from "fastify";
import { ProfileUserRepository } from "../../../repositories/user/profiler-user.repository";
import { ProfileUserService } from "../../../services/user/profile-user.service";



const profileUserRepo = new ProfileUserRepository()
const profileUserService = new ProfileUserService(profileUserRepo)


export async function profileUserController(req: FastifyRequest<{Params:{id: string}}> , rep : FastifyReply): Promise <void> {

  const { id } = req.params

  try {
    const user = await profileUserService.execute(id)
    rep.status(201).send(user)
  } catch (err) {
    if (err instanceof Error) {
      if (err.message == 'user_not_found') {
        rep.status(404).send({
          message: "user not found"
        })
      }
    }
  }

}
