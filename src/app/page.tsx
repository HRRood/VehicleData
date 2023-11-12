import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { VehiclesWrapper } from "@/frontend/components/vehicles/VehiclesWrapper";
import { FillupsWrapper } from "@/frontend/wrappers/fillupsWrapper";
import { TripsWrapper } from "@/frontend/wrappers/tripsWrapper";
import { Box } from "@mui/material";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    redirect("/login");
  }
  return (
    <Box sx={{ padding: "20px", margin: "0 auto" }}>
      <VehiclesWrapper />
      <FillupsWrapper />
      <TripsWrapper />
    </Box>
  );
}
