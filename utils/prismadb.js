import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prismadb =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismadb;
