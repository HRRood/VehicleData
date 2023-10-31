import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { isValid } from "date-fns";
import { FindVehicleById } from "@/backend/repository/vehicles/findVehicleById";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { IsVehicleOfUser } from "@/backend/repository/vehicles/isVehicleOfUser";
import { db } from "@/firebase/clientApp";
import { addDoc, collection, Timestamp } from "firebase/firestore";

interface PostBodyTrip {
  drivenKm: number;
  startDateTime: Date;
  endDateTime: Date;
  startLocation: string;
  endLocation: string;
  vehicleId: string;
}

export async function POST(request: Request) {
  const session = await getServerSession(options);

  if (!session || !session.user?.email) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorised"), { status: 401 });
  }

  const { drivenKm, startDateTime, endDateTime, startLocation, endLocation, vehicleId }: PostBodyTrip = await request.json();

  const isVehicleOfUser = await IsVehicleOfUser(vehicleId);

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

  const newTrip = await addDoc(collection(db, "trips"), {
    drivenKm: drivenKm,
    startTime: Timestamp.fromDate(newStartDateTime),
    endTime: Timestamp.fromDate(newEndDateTime),
    start: startLocation,
    end: endLocation,
    vehicleId: vehicleId,
  });

  return NextResponse.json(createDefaultResponse(newTrip, true, "Fillup created"));
}
