import type { ProfileUserRepository } from "../../repositories/user/profiler-user.repository";



export class ProfileUserService {

  private readonly profileUserRepository: ProfileUserRepository;

  constructor(profileUserRepository: ProfileUserRepository) {
    this.profileUserRepository = profileUserRepository
  }

  async execute(id: string) {

    const user = await this.profileUserRepository.findUser(id)

    if (!user) {
      throw new Error("user_not_found")
    }

    return user

  }
}
