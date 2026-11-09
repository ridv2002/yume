import type { LoginUserRepository } from "../../repositories/user/login-user.repository";
import type { SignInInput } from "../../schemas";
import { verifyHash } from "../../utils/hash";



export class LoginUserService{

  private readonly loginUserRepository: LoginUserRepository;

  constructor(loginUserRepository: LoginUserRepository) {
    this.loginUserRepository = loginUserRepository
  }

  async execute(data: SignInInput) {

    const user = await this.loginUserRepository.loginUser(data)

    if (!user) {
      throw new Error("user_not_found")
    }

    const isPassword = await verifyHash(data.password, user.password)

    if (!isPassword) {
      throw new Error("invalide_credentials")
    }

    return {
      email: user.email,
      id: user.id
    }
  }

}
