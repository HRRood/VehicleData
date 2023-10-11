import { prisma } from "@/lib/prisma";

export async function FindVehicleByLicense(license: string) {
  return await prisma.vehicles.findFirst({
    where: {
      LicensePlate: license,
    },
  });
}
