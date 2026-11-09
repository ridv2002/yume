import type { CreateUserRepository , FindUserRepository } from "../../repositories";
import type { SignUpInput } from "../../schemas";
import { createHash } from "../../utils/hash";

export class CreateUserService {

  private readonly signUpRepo: CreateUserRepository;
  private readonly findUserRepo: FindUserRepository;

  constructor(signUpRepo: CreateUserRepository , findUserRepo: FindUserRepository) {
    this.signUpRepo = signUpRepo,
    this.findUserRepo = findUserRepo
  }

  async execute(data: SignUpInput) {

    const existsUser = await this.findUserRepo.findUser({
      email: data.email
    })

    if (existsUser) {
      throw new Error("email_already_exists")
    }

    const hashedPassword = await createHash(data.password) as string;

    try{
      return this.signUpRepo.createUser({...data, password: hashedPassword})
    } catch {
      throw new Error("error_create_acount")
    }
  }

}
