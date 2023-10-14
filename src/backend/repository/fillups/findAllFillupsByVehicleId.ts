import { prisma } from "@/backend/lib/prisma";

export async function FindAllFillupsByVehicleId(vehicleId: number) {
  return await prisma.fillups.findMany({
    where: {
      VehicleId: vehicleId,
    },
  });
}
