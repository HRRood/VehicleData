import { prisma } from "@/backend/lib/prisma";

export async function GetVehicles() {
  return await prisma.vehicles.findMany({
    include: {
      Users: {
        select: {
          Email: true,
        },
      },
    },
  });
}
