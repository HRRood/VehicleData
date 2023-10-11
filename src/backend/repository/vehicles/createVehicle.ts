import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/backend/lib/prisma";
import { getServerSession } from "next-auth";
import { FindUserByEmail } from "../users/findUserByEmail";

export async function CreateVehicle(make: string, model: string, year: number, license: string, odo?: number) {
  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.email) {
    return null;
  }

  const user = await FindUserByEmail(session.user?.email);

  if (!user) {
    return null;
  }

  return await prisma.vehicles.create({
    data: {
      UserId: user.Id,
      Make: make,
      Model: model,
      Year: year,
      LicensePlate: license,
      Odo: odo,
    },
  });
}
