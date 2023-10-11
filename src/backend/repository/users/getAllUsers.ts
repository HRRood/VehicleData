import { prisma } from "@/backend/lib/prisma";

export async function GetAllUsers() {
  return await prisma.users.findMany();
}
