
import { MongoClient } from "mongodb";
import type { Db, Document, Collection } from "mongodb";

export class MongoDB {
  private readonly client: MongoClient;
  private readonly db: Db;
  private readonly uri: string;
  private readonly databaseName: string;

  constructor(uri: string, databaseName: string) {
    this.uri = uri;
    this.databaseName = databaseName;

    this.client = new MongoClient(this.uri);
    this.db = this.client.db(this.databaseName);
  }

  async connect(): Promise<void> {
    await this.client.connect();

    await this.db.command({ ping: 1 });

    console.log(`MongoDB conectado: ${this.databaseName}`);
  }

  async disconnect(): Promise<void> {
    await this.client.close();

    console.log("MongoDB desconectado");
  }

  getDatabase(): Db {
    return this.db;
  }

  collection<T extends Document>(name: string): Collection<T> {
    return this.db.collection<T>(name);
  }
}
