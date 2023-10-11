import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { CreateVehicle } from "@/backend/repository/vehicles/createVehicle";
import { FindUserByEmail } from "@/backend/repository/users/findUserByEmail";
import { FindVehicleByLicense } from "@/backend/repository/vehicles/findVehicleByLicense";
import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";
import { options } from "../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorized"), { status: 401 });
  }

  const user = await FindUserByEmail(session.user?.email);

  if (!user) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorized"), { status: 401 });
  }

  const vehicles = await GetAllVehiclesOfUser();

  return NextResponse.json(createDefaultResponse(vehicles));
}

interface PostBodyVehicles {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  odo: number;
}

export async function POST(request: Request) {
  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorized"), { status: 401 });
  }

  const user = await FindUserByEmail(session.user?.email);

  if (!user) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorized"), { status: 401 });
  }

  const { licensePlate, make, model, year, odo } = (await request.json()) as PostBodyVehicles;

  const existingVehicleWithLicense = await FindVehicleByLicense(licensePlate);

  if (existingVehicleWithLicense) {
    return NextResponse.json(createDefaultResponse({}, false, "Vehicle with this license plate already exists"));
  }

  const createdVehicle = await CreateVehicle(make, model, year, licensePlate, odo ?? undefined);

  if (!createdVehicle) {
    return NextResponse.json(createDefaultResponse({}, false, "Failed to create vehicle"));
  }

  return NextResponse.json(createDefaultResponse(createdVehicle));
}
