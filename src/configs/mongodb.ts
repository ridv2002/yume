import { MongoDB } from "../libs/mongodb";
import { env } from "./env";

export async function registerMongodb() {

  const mongo = new MongoDB(
    env.MONGODB_URI!,
    env.MONGODB_DATABASE!,
  );

  await mongo.connect();
}
