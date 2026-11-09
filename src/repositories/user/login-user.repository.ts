import { db } from "../../db";
import type { SignInInput } from "../../schemas";
import { user } from "../../db/schemas";
import { and, eq } from "drizzle-orm";

export class LoginUserRepository{


  async loginUser(data: SignInInput) {
    const findUser = await db.query.user.findFirst({
      where: and(
        eq(user.email, data.email)
      ),
      columns: {
        email: true,
        password: true,
        id: true
      }
    });

    console.log(findUser)

    return findUser
  }

}
