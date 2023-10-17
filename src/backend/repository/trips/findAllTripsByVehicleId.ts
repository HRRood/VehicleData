import { prisma } from "@/backend/lib/prisma";

export async function FindAllTripsByVehicleId(vehicleId: number) {
  return await prisma.trips.findMany({
    where: {
      VehicleId: vehicleId,
    },
  });
}
