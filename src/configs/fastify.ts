import fastifyJwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import type { FastifyTypedInstance } from "../types/fastify-instance";
import { env } from "./env";


export async function registerPlugins(
  fastify: FastifyTypedInstance
) {

  await fastify.register(cookie, {
     secret: env.COOKIE_SECRET,
     hook: "onRequest",
  });

  await fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: "access_token",
      signed: false,
    },
  });

}
