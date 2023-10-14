import { prisma } from "@/backend/lib/prisma";

export async function UpdateVehicleOdo(id: number, odo: number) {
  return await prisma.vehicles.update({
    where: {
      Id: id,
    },
    data: {
      Odo: odo,
    },
  });
}
