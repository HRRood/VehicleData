import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { FindAllUsedLocations } from "@/backend/repository/users/findAllUsedLocations";

export async function GET() {
  const session = await getServerSession(options);
  if (!session || !session.user?.email) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorized"), { status: 401 });
  }

  const response = await FindAllUsedLocations(session.user.email);
  return NextResponse.json(createDefaultResponse(response));
}
