import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { VehiclesWrapper } from "@/frontend/components/vehicles/VehiclesWrapper";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    redirect("/login");
  }
  return (
    <div style={{ maxWidth: "1200px", padding: "20px", margin: "0 auto" }}>
      <VehiclesWrapper />
    </div>
  );
}
