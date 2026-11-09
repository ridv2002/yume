import { z } from "zod";

import {
  createInsertSchema,
  createSelectSchema,
} from "drizzle-zod";

import { user } from "../../db/schemas";

// Cadastro de usuário
export const signUpSchema = createInsertSchema(user, {

  email: z.email({error: "Precisa ser um email válido"}),
  password: z.string().min(6, {error: "Senha precisa ter pelo menos 6 caracteres"}),
  name: z.string().min(5, {error: "Nome precisa ter pelo menos 5 caracteres"}),
  lastName: z.string().min(5, { error: "Sobrenome precisa ter pelo menos 5 caracteres" }),
  age: z.int()
    .min(1, "Idade precisa ser maior que zero")
    .max(120, "Idade máxima permitida é 120"),
  token: z.string(),
  icon: z.url().default("https://i.pinimg.com/736x/5b/19/0c/5b190c0ba0150f06f141ef1ac4f45a10.jpg")

}).omit({
  token: true
})

export const updateUserSchema  = z.object({

  id: z.uuid({ error: "Uuid Invalido!" }),
  email: z.email({error: "Precisa ser um email válido"}),
  name: z.string().min(3, {error: "Nome precisa ter pelo menos 5 caracteres"}),
  lastName: z.string().min(5, { error: "Sobrenome precisa ter pelo menos 5 caracteres" }),
  icon: z.url().default("https://i.pinimg.com/736x/5b/19/0c/5b190c0ba0150f06f141ef1ac4f45a10.jpg")

})
// Login
export const signInSchema = z.object({

  email: z.email({error: "Precisa ser um email válido"}),
  password: z.string().min(6, { error: "Senha inválida" }),

});

export const findUserSchema = z.object({
  email: z.email({error: "Precisa ser um email válido"}),
})

// Dados completos do banco
export const selectUserSchema = createSelectSchema(user);

// Dados públicos do usuário
export const publicUserSchema = selectUserSchema.omit({

  password: true,
  token: true,

});

// Tipos TypeScript
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
export type FindUser = z.infer<typeof findUserSchema>
