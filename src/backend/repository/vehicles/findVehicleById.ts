import { prisma } from "@/backend/lib/prisma";

export async function FindVehicleById(id: number) {
  return await prisma.vehicles.findFirst({
    where: {
      Id: id,
    },
  });
}
