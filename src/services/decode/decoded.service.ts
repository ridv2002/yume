import type { FastifyTypedInstance } from "../../types/fastify-instance";

export class AuthService {
  private readonly app: FastifyTypedInstance

  constructor(app: FastifyTypedInstance) {
    this.app = app
  }

  async validateToken(token: string) {
    const decoded = this.app.jwt.verify(token) as {
      id: string;
    };

    return decoded;
  }
}
