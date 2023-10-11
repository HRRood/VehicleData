import { FindUserByEmail } from "@/backend/repository/users/findUserByEmail";
import { GetAllUsers } from "@/backend/repository/users/getAllUsers";
import { createDefaultResponse } from "@/backend/utils/createDefaultResponse";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/backend/lib/prisma";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(createDefaultResponse({}, false, "Unauthorised"), { status: 401 });
  }

  const users = await GetAllUsers();
  return NextResponse.json(createDefaultResponse(users));
}

export interface PostBodyUsers {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

async function hashPassword(password: string) {
  return bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt));
}

export async function POST(request: Request) {
  const { email, firstname, lastname, password }: PostBodyUsers = await request.json();

  const existingUser = await FindUserByEmail(email);
  if (existingUser) {
    return NextResponse.json(createDefaultResponse({}, false, "User already exists"));
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await prisma.users.create({
    data: {
      Email: email,
      FirstName: firstname,
      LastName: lastname,
      Password: hashedPassword,
    },
  });

  if (!newUser) {
    return NextResponse.json(createDefaultResponse({}, false, "Failed to create user"));
  }

  return NextResponse.json(createDefaultResponse(newUser));
}
