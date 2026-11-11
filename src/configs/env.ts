import dotenv from "dotenv";

const environment = process.env.NODE_ENV ?? "development";

dotenv.config({
  path: `.env.${environment}`,
});




interface Env {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  COOKIE_SECRET: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_STORAGE_BUCKET: string;
  S3_SECRET_KEY: string;
  S3_ACCESS_KEY: string;
  S3_ENDPOINT: string;
  MONGODB_URI: string;
  MONGODB_DATABASE: string;
  GEMMA_API_URL: string;

  GEMINI_API_URL: string;
  GEMINI_API_KEY: string;
  GEMINI_MODEL: string
}


export const env: Env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3000),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  COOKIE_SECRET: process.env.COOKIE_SECRET!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET!,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY!,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY!,
  S3_ENDPOINT: process.env.S3_ENDPOINT!,
  MONGODB_URI: process.env.MONGODB_URI!,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE!,
  GEMMA_API_URL: process.env.GEMMA_API_URL!,
  GEMINI_API_URL: process.env.GEMINI_API_URL!,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
  GEMINI_MODEL: process.env.GEMINI_MODEL!,

};
