import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { isValid } from "date-fns";
import { prisma } from "@/backend/lib/prisma";
import { FindVehicleById } from "@/backend/repository/vehicles/findVehicleById";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { UpdateVehicleOdo } from "@/backend/repository/vehicles/updateVehicleOdo";
// import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";

interface PostBodyFillup {
  date?: Date;
  drivenKm: number;
  litersFilled: number;
  cost: number;
  location: string;
  stationName: string;
  vehicleId: number;
}

export async function POST(request: Request) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorised"), { status: 401 });
  }

  const { date, drivenKm, litersFilled, location, cost, stationName, vehicleId }: PostBodyFillup = await request.json();
  const vehicle = await FindVehicleById(vehicleId);

  if (!vehicle) {
    return NextResponse.json(createDefaultResponse({}, false, "Vehicle not found"));
  }

  if (!date) {
    return NextResponse.json(false);
  }
  let newDate = new Date(date);
  if (!isValid(newDate)) {
    newDate = new Date();
  }

  const newFillup = await prisma.fillups.create({
    data: {
      Date: newDate,
      VehicleId: vehicleId,
      DrivenKm: drivenKm,
      LitersFilled: litersFilled,
      FuelEfficiency: drivenKm / litersFilled,
      Costs: cost,
      Location: location,
      StationName: stationName,
    },
  });

  const newOdo = drivenKm + (vehicle.Odo ?? 0);

  const updatedVehicle = await UpdateVehicleOdo(vehicleId, newOdo);

  const responseObj = createDefaultResponse({ newFillup, updatedVehicle }, true, "Fillup created");

  return NextResponse.json(responseObj);
}
