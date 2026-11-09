import { eq } from "drizzle-orm";
import { db } from "../../db";
import { user } from "../../db/schemas";

import type { FindUser } from "../../schemas";

export class FindUserRepository{
  async findUser(data: FindUser) {
    const exUser = await db.query.user.findFirst({
      where: eq(user.email, data.email)
    })
    return exUser ?? null
  }
}
