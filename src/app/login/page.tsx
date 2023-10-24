import { Login } from "@/frontend/components/pages/login/login";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { GetVehicles } from "@/backend/repository/vehicles/getVehicles";

export default async function LoginPage() {
  const session = await getServerSession(options);
  const vehicles = await GetVehicles();

  if (session) {
    redirect("/");
  }

  return (
    <>
      {JSON.stringify(vehicles)}
      <Login />
    </>
  );
}
