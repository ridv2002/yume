import type { UpdateUserRepository } from "../../repositories/user/update-user.repository";
import type { UpdateUserInput } from "../../schemas";






export class UpdateUserService{

  private readonly updateUserRepository: UpdateUserRepository;

  constructor(updateUserRepository: UpdateUserRepository) {
    this.updateUserRepository = updateUserRepository
  }


  async execute(data : UpdateUserInput) {

    const user = await this.updateUserRepository.updateUser(data)

    if (!user) {
      throw new Error("user_not_found")
    }

    return user

  }

}
