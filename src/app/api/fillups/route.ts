import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { isValid } from "date-fns";
import { FindVehicleById } from "@/backend/repository/vehicles/findVehicleById";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { UpdateVehicleOdo } from "@/backend/repository/vehicles/updateVehicleOdo";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/clientApp";

interface PostBodyFillup {
  date?: Date;
  drivenKm: number;
  litersFilled: number;
  cost: number;
  location: string;
  stationName: string;
  vehicleId: string;
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
  let newDate = new Date();
  if (date && isValid(new Date(date))) {
    newDate = new Date(date);
  }

  const newFillup = await addDoc(collection(db, "fillups"), {
    date: Timestamp.fromDate(newDate),
    drivenKm,
    litersFilled,
    location,
    costs: cost,
    station: stationName,
    vehicleId,
    efficiency: drivenKm / litersFilled,
  });

  const newOdo = drivenKm + (Number(vehicle.odometer) ?? 0);

  const updatedVehicle = await UpdateVehicleOdo(vehicleId, newOdo);

  const responseObj = createDefaultResponse({ newFillup, updatedVehicle }, true, "Fillup created");

  return NextResponse.json(responseObj);
}
