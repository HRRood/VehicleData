import { GetAllUsers } from "@/backend/repository/users/getAllUsers";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await GetAllUsers();
  return NextResponse.json(createDefaultResponse(users));
}
