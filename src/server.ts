import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyTypedInstance } from "./types/fastify-instance";
import { user } from "./http/routes";


export async function register(
    fastify: FastifyTypedInstance
) {

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  await fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: "igins-api",
          version: "0.0.1",
        },
        components: {},
      },
      transform: jsonSchemaTransform,
  });

  await fastify.register(fastifySwaggerUi, {
     routePrefix: "/docs",
  });


  await fastify.register(user)

}
