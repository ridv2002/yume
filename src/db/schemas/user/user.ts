
import { integer, pgTable, varchar, text , uuid } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  password: text("password").notNull(),

  name: varchar("name", { length: 255 }).notNull(),

  lastName: varchar("lastName", { length: 255 }).notNull(),

  age: integer("age").notNull(),

  icon: text("icon").notNull(),

  token: varchar("token", { length: 64 }).notNull()
});





// import { drizzle } from 'drizzle-orm/postgres';
// import { defineRelations } from 'drizzle-orm';
// import * as p from 'drizzle-orm/pg-core';
//
// export const users = p.pgTable('users', {
// 	id: p.integer().primaryKey(),
// 	name: p.text().notNull()
// });
//
// export const posts = p.pgTable('posts', {
// 	id: p.integer().primaryKey(),
// 	content: p.text().notNull(),
// 	ownerId: p.integer('owner_id'),
// });
//
// const relations = defineRelations({ users, posts }, (r) => ({
// 	posts: {
// 		author: r.one.users({
// 			from: r.posts.ownerId,
// 			to: r.users.id,
// 		}),
// 	}
// }))
//
// const db = drizzle({ client, relations });
//
// const result = await db.query.posts.findMany({
//   with: {
//     author: true,
//   },
// });
