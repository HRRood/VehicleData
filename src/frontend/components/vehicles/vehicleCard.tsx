import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Vehicles } from "@prisma/client";
import { useAtom } from "jotai";
import { AddFillUpModal } from "./addFillUpModal/addFillUpModal";
import { AddTripModal } from "./addTripModal/addTripModal";

interface VehicleCardProps {
  vehicle: Vehicles;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [selectedVehicle, setVehicle] = useAtom(SelectedVehicleAtom);

  const isSelected = selectedVehicle?.Id === vehicle.Id;

  const handleClick = (e: any) => {
    // @ts-ignore
    if (e.target.tagName === "BUTTON") return;
    setVehicle(vehicle);
  };

  return (
    <Card
      onClick={handleClick}
      variant="elevation"
      key={vehicle.Id}
      sx={{ cursor: "pointer", width: 300, border: 2, borderColor: isSelected ? "secondary.main" : "transparent" }}
    >
      <CardMedia component="img" height="250" image={vehicle.Image || ""} alt="vehicle" />
      <CardContent>
        <Typography variant="h5" fontWeight={800}>
          {vehicle.Make} {vehicle.Model}
        </Typography>
        <Typography variant="subtitle1" borderRadius="5px" bgcolor="#eda909" color="black" fontWeight={800} align="center">
          {vehicle.LicensePlate}
        </Typography>
        <Typography variant="subtitle1">Bouwjaar: {vehicle.Year}</Typography>
        <Typography>Total KM: {vehicle.Odo}</Typography>

        <div style={{ margin: "5px 0", display: "flex", justifyContent: "space-between" }}>
          <AddFillUpModal />
          <AddTripModal />
        </div>
      </CardContent>
    </Card>
  );
};
