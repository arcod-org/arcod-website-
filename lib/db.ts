import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma's Rust-free client + node-postgres adapter.
// Works well with Neon's pooled connection string and keeps cold starts small.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL is not set");
  // Neon URLs end with ?sslmode=require. node-postgres prints a security warning for that
  // value, so we remove it from the URL and turn on full TLS certificate checking directly.
  const url = new URL(raw);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const adapter = new PrismaPg({ connectionString: url.toString(), ssl: { rejectUnauthorized: true }, max: 5 });
  return new PrismaClient({ adapter });
}

export function db(): PrismaClient {
  if (!globalForPrisma.prisma) globalForPrisma.prisma = createClient();
  return globalForPrisma.prisma;
}

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);
