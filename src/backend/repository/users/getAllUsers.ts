import { prisma } from "@/lib/prisma";

export async function GetAllUsers() {
  return await prisma.users.findMany();
}
