import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { VehiclesWrapper } from "@/frontend/components/vehicles/VehiclesWrapper";
import { FillupsWrapper } from "@/frontend/wrappers/fillupsWrapper";
import { TripsWrapper } from "@/frontend/wrappers/tripsWrapper";
import { Box } from "@radix-ui/themes";

export type RadixColors =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky"
  | undefined;

export type RadixButtonVariants = "outline" | "soft" | "classic" | "solid" | "surface" | "ghost" | undefined;

export default async function Home() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    redirect("/login");
  }
  return (
    <Box style={{ padding: "20px", margin: "0 auto" }}>
      <VehiclesWrapper />
      <FillupsWrapper />
      <TripsWrapper />
    </Box>
  );
}
