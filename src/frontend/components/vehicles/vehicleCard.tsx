import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useAtom } from "jotai";
import { AddFillUpModal } from "./addFillUpModal/addFillUpModal";
import { AddTripModal } from "./addTripModal/addTripModal";
import { Vehicle } from "@/frontend/hooks/useVehicles";
import { Box, Heading, Inset } from "@radix-ui/themes";
import Image from "next/image";
import { crimson } from "@radix-ui/colors";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [selectedVehicle, setVehicle] = useAtom(SelectedVehicleAtom);

  const isSelected = selectedVehicle?.id === vehicle.id;

  const handleClick = (e: any) => {
    // @ts-ignore
    if (e.target.tagName === "BUTTON") return;
    setVehicle(vehicle);
  };

  return (
    <Box style={{ maxWidth: 240, cursor: "pointer", border: `2px solid ${isSelected ? crimson.crimson12 : "transparent"}` }} onClick={handleClick}>
      <Inset clip="padding-box" side="top" pb="current">
        <Image
          src={vehicle.image}
          alt={vehicle.make + " " + vehicle.model}
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 225,
            backgroundColor: "var(--gray-5)",
          }}
          width={500}
          height={500}
        />
      </Inset>
      <Box style={{ padding: "10px" }}>
        <Heading>
          {vehicle.make} {vehicle.model}
        </Heading>
        <Heading size="4" align="center" style={{ backgroundColor: "#eda909", color: "black" }}>
          {vehicle.licensePlate}
        </Heading>
        <Heading size="3" weight="light">
          Bouwjaar: {vehicle.year}
        </Heading>
        <Heading size="3" weight="light">
          Total KM: {vehicle.odometer}
        </Heading>

        <Box style={{ margin: "5px 0", display: "flex", justifyContent: "space-between" }}>
          <AddFillUpModal />
          <AddTripModal />
        </Box>
      </Box>
    </Box>
  );
};
