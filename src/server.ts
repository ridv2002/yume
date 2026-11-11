import type { FastifyTypedInstance } from "./types/fastify-instance";

import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { registerPlugins } from "./configs/fastify";


import {
  user,
  chat
} from "./http/routes";


export async function register(
    fastify: FastifyTypedInstance
) {

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);


  await fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: "yume-api",
          version: "0.0.1",
        },
        components: {},
      },
      transform: jsonSchemaTransform,
  });

  await fastify.register(fastifySwaggerUi, {
     routePrefix: "/docs",
  });

  await registerPlugins(fastify)

  await fastify.register(user)
  await fastify.register(chat)

}
