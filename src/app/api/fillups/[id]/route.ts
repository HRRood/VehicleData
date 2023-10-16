import { FindAllFillupsByVehicleId } from "@/backend/repository/fillups/findAllFillupsByVehicleId";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { IsVehicleOfUser } from "@/backend/repository/vehicles/isVehicleOfUser";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(options);

  if (!session || !session?.user?.email) {
    return NextResponse.json(createDefaultResponse(null), { status: 401 });
  }

  const isVehicleOfUser = await IsVehicleOfUser(Number(id), session.user.email);
  if (!isVehicleOfUser) {
    return NextResponse.json(createDefaultResponse(null), { status: 403 });
  }

  const fillups = await FindAllFillupsByVehicleId(Number(id));
  return NextResponse.json(createDefaultResponse(fillups));
}