import { FindUserByEmail } from "@/backend/repository/users/findUserByEmail";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface PostBodyAuth {
  email: string;
  password: string;
}

async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function POST(request: Request) {
  const { email, password }: PostBodyAuth = await request.json();

  const existingUser = await FindUserByEmail(email);

  if (!existingUser) {
    return NextResponse.json(createDefaultResponse({}, false, "Incorrect data"));
  }

  const passwordMatch = await comparePassword(password, existingUser.password);

  if (!passwordMatch) {
    return NextResponse.json(createDefaultResponse({}, false, "Incorrect data"));
  }

  return NextResponse.json(
    createDefaultResponse({ id: existingUser.id, email: existingUser.email, name: `${existingUser.firstname} ${existingUser.lastname}` })
  );
}
