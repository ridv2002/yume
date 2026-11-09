import { AuthService } from "../services";
import { VerifyAuthMiddleware } from "../http/middlewares/auth.middleware";
import type { FastifyTypedInstance } from "../types/fastify-instance";

export function makeVerifyAuthMiddleware(app: FastifyTypedInstance) {
  const authService = new AuthService(app);

  return new VerifyAuthMiddleware(authService);
}
