import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/backend/lib/prisma";
import { getServerSession } from "next-auth";

export async function GetAllVehiclesOfUser() {
  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.email) {
    return [];
  }

  return await prisma.vehicles.findMany({
    include: {
      Users: {
        select: {
          Email: true,
        },
      },
    },
    where: {
      Users: {
        Email: session.user.email,
      },
    },
  });
}
