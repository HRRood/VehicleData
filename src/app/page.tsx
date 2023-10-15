import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { VehiclesWrapper } from "@/frontend/components/vehicles/VehiclesWrapper";
import { FillupsWrapper } from "@/frontend/components/fillups/fillupsWrapper";
import { TripsWrapper } from "@/frontend/components/tripsWrapper/tripsWrapper";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    redirect("/login");
  }
  return (
    <div style={{ maxWidth: "1300px", padding: "20px", margin: "0 auto" }}>
      <VehiclesWrapper />
      <FillupsWrapper />
      <TripsWrapper />
    </div>
  );
}
