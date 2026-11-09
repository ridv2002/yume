import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { register } from "./server";
import Fastify from "fastify";
import { env } from "./configs/env";

async function start() {
  const fastify = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  try {
    // Primeiro registra os plugins e as rotas
    await register(fastify);

    // Depois inicia o servidor
    await fastify.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
