import type { FastifyReply, FastifyRequest } from "fastify";
import type { SignInInput } from "../../../schemas";
import { LoginUserService } from "../../../services/user/login-user.service";
import { LoginUserRepository } from "../../../repositories/user/login-user.repository";


const loginUserRepo = new LoginUserRepository()
const loginUserService = new LoginUserService(loginUserRepo)


function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
  };
}


export async function loginUserController(req: FastifyRequest<{ Body: SignInInput }>, rep: FastifyReply): Promise<void>
{
  const data = req.body
  try{
    const user = await loginUserService.execute(data)

    const access_token = req.server.jwt.sign(
        { id: user.id, email: user.email },
        { expiresIn: "1h" },
    );

    rep.setCookie("access_token", access_token, {
      ...cookieOptions(), maxAge: 3600, path: "/",
    })

    rep.status(201).send({
      user: user.email.slice(0, 6) ,
    })


  } catch (err) {
    console.error("ERRO NO LOGIN:", err);
    if (err instanceof Error) {
      if (err.message == "user_not_found") {
        rep.status(401).send({
          message: "Email ou senha incorretos"
        })
      }
      if (err.message == "invalide_credentials") {
        rep.status(401).send({
          message: "Email ou senha incorretos"
        })
      }
    }

    rep.status(500).send({
      message: "Internal error"
    })
  }
}
