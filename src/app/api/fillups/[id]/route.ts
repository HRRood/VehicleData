import { FindAllFillupsByVehicleId } from "@/backend/repository/fillups/findAllFillupsByVehicleId";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { IsVehicleOfUser } from "@/backend/repository/vehicles/isVehicleOfUser";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(options);

  if (!session || !session?.user?.email) {
    return NextResponse.json(createDefaultResponse(null, false, "Unauthorized"), { status: 401 });
  }

  const isVehicleOfUser = await IsVehicleOfUser(id);
  if (!isVehicleOfUser) {
    return NextResponse.json(createDefaultResponse(null, false, "Not jo vehicle"), { status: 403 });
  }

  const fillups = await FindAllFillupsByVehicleId(id);
  return NextResponse.json(createDefaultResponse(fillups));
}
