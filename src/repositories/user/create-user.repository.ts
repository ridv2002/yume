import { user } from "../../db/schemas";
import { db } from "../../db";
import { randomBytes } from "node:crypto";

import type { SignUpInput } from "../../schemas/user/user.schemas";


export class CreateUserRepository{

  async createUser(data: SignUpInput) {

    const [users] = await db.insert(user).values({ ...data, token: randomBytes(4).toString("hex")}).returning()

    return users
  }
}
