import { Login } from "@/frontend/components/pages/login/login";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(options);

  if (session) {
    redirect("/");
  }

  return (
    <>
      <Login />
    </>
  );
}
