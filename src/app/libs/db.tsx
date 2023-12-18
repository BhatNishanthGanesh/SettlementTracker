
import { PrismaClient } from "@prisma/client";

// Declare the type for globalThis (you might need to adjust this type based on your usage)
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production' && !globalThis.prisma) {
  globalThis.prisma = client;
}

export default client;