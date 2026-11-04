import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { register } from "./server"
import Fastify from "fastify";
import { env } from "./configs/env";


async function start() {


  const fastify = Fastify({
    logger: true,
   }).withTypeProvider<ZodTypeProvider>();


  fastify.listen({
    port: env.PORT
  })

  await register(fastify)
}


start()
