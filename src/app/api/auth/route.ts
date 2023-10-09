import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ username: "test", email: "test@test.com", name: "Test User" });
}
