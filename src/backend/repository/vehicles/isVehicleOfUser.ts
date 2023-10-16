import { prisma } from "@/backend/lib/prisma";

export async function IsVehicleOfUser(vehicleId: number, userMail: string): Promise<boolean> {
  const hasVehicle = await prisma.vehicles.findFirst({
    include: {
      Users: true,
    },
    where: {
      Id: vehicleId,
      Users: {
        Email: userMail,
      },
    },
  });

  return hasVehicle !== null;
}
