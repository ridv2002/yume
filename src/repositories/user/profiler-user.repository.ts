import { eq } from "drizzle-orm";
import { db } from "../../db";
import { user } from "../../db/schemas";

export class ProfileUserRepository{
  async findUser( id : string) {
    const exUser = await db.query.user.findFirst({
      where: eq(user.id, id),
      columns: {
        token: false,
        password: false,
        id: false
      }
    })


    return exUser ?? null
  }
}
