

import { user } from "../../db/schemas";
import { db } from "../../db";

import type { UpdateUserInput } from "../../schemas/user/user.schemas";


export class UpdateUserRepository{

  async updateUser(data: UpdateUserInput) {

    const users = await db.update(user).set(data)

    return users
  }
}
