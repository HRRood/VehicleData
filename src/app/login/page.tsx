import { Login } from "@/frontend/components/pages/login/login";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { GetVehicles } from "@/backend/repository/vehicles/getVehicles";

export default async function LoginPage() {
  const session = await getServerSession(options);
  let anyThing: any;
  try {
    anyThing = await GetVehicles();
  } catch (error) {
    console.log(error);
    anyThing = error;
  }

  if (session) {
    redirect("/");
  }

  return (
    <>
      {JSON.stringify(anyThing)}
      <Login />
    </>
  );
}
