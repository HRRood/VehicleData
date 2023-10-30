import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { AddFillUpModal } from "./addFillUpModal/addFillUpModal";
import { AddTripModal } from "./addTripModal/addTripModal";
import { Vehicle } from "@/frontend/hooks/useVehicles";

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
    <Card
      onClick={handleClick}
      variant="elevation"
      key={vehicle.id}
      sx={{ cursor: "pointer", width: 300, border: 2, borderColor: isSelected ? "secondary.main" : "transparent" }}
    >
      <CardMedia component="img" height="250" image={vehicle.image || ""} alt="vehicle" />
      <CardContent>
        <Typography variant="h5" fontWeight={800}>
          {vehicle.make} {vehicle.model}
        </Typography>
        <Typography variant="subtitle1" borderRadius="5px" bgcolor="#eda909" color="black" fontWeight={800} align="center">
          {vehicle.licensePlate}
        </Typography>
        <Typography variant="subtitle1">Bouwjaar: {vehicle.year}</Typography>
        <Typography>Total KM: {vehicle.odometer}</Typography>

        <div style={{ margin: "5px 0", display: "flex", justifyContent: "space-between" }}>
          <AddFillUpModal />
          <AddTripModal />
        </div>
      </CardContent>
    </Card>
  );
};
