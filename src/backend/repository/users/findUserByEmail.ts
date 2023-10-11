import { prisma } from "@/lib/prisma";

export async function FindUserByEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      Email: email,
    },
  });
}
