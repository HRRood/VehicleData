import { FindAllFillupsByVehicleId } from "@/backend/repository/fillups/findAllFillupsByVehicleId";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  console.log(id);
  const fillups = await FindAllFillupsByVehicleId(Number(id));
  return NextResponse.json(createDefaultResponse(fillups));
}
