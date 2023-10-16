import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { isValid } from "date-fns";
import { prisma } from "@/backend/lib/prisma";
import { FindVehicleById } from "@/backend/repository/vehicles/findVehicleById";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { UpdateVehicleOdo } from "@/backend/repository/vehicles/updateVehicleOdo";
import { IsVehicleOfUser } from "@/backend/repository/vehicles/isVehicleOfUser";
// import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";

interface PostBodyFillup {
  drivenKm: number;
  startDateTime: Date;
  endDateTime: Date;
  startLocation: string;
  endLocation: string;
  vehicleId: number;
}

export async function POST(request: Request) {
  const session = await getServerSession(options);

  if (!session || !session.user?.email) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorised"), { status: 401 });
  }
  const { drivenKm, startDateTime, endDateTime, startLocation, endLocation, vehicleId }: PostBodyFillup = await request.json();

  const isVehicleOfUser = await IsVehicleOfUser(vehicleId, session.user.email);

  if (!isVehicleOfUser) {
    return NextResponse.json(createDefaultResponse({}, false, "Vehicle not found or not yours"), { status: 401 });
  }

  const vehicle = await FindVehicleById(vehicleId);

  if (!vehicle) {
    return NextResponse.json(createDefaultResponse({}, false, "Vehicle not found"));
  }

  if (!drivenKm || !startDateTime || !endDateTime || !startLocation || !endLocation) {
    return NextResponse.json(createDefaultResponse({}, false, "Missing data"));
  }
  let newStartDateTime = new Date(startDateTime);
  if (!isValid(newStartDateTime)) {
    newStartDateTime = new Date();
  }

  let newEndDateTime = new Date(endDateTime);
  if (!isValid(newEndDateTime)) {
    newEndDateTime = new Date();
  }

  const newFillup = await prisma.trips.create({
    data: {
      DrivenKm: drivenKm,
      StartDateTime: newStartDateTime,
      EndDateTime: newEndDateTime,
      StartLocation: startLocation,
      EndLocation: endLocation,
      VehicleId: vehicleId,
    },
  });

  const newOdo = drivenKm + (vehicle.Odo ?? 0);

  const updatedVehicle = await UpdateVehicleOdo(vehicleId, newOdo);

  return NextResponse.json(createDefaultResponse({ newFillup, updatedVehicle }, true, "Fillup created"));
}
