"use client";

import { useVehicles } from "@/frontend/hooks/useVehicles";
import { Vehicles } from "@prisma/client";
import Loader from "../global/Loader/loader";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";

interface VehicleListProps {
  serverData: Vehicles[];
}

export const VehicleList = ({ serverData }: VehicleListProps) => {
  const { data, isLoading } = useVehicles({ fallbackData: serverData });

  const [selectedVehicle, setVehicle] = useAtom(SelectedVehicleAtom);

  useEffect(() => {
    if (!data || data.length <= 0) return;
    setVehicle(data[0]);
  }, []);

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (!data) return <p>Something went wrong</p>;

  if (data?.length === 0) return <p>No vehicles added yet, use the add button to add your vehicle.</p>;

  const vehicles = data.map((vehicle) => {
    const isSelected = selectedVehicle?.Id === vehicle.Id;
    return (
      <Card
        onClick={() => setVehicle(vehicle)}
        variant="elevation"
        key={vehicle.Id}
        sx={{ cursor: "pointer", width: 300, border: 1, borderColor: isSelected ? "primary.main" : "transparent" }}
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
        </CardContent>
        {/* <p style={{ fontSize: "20px", fontWeight: 800 }}>
          {vehicle.Make} {vehicle.Model}
        </p>
        <p style={{ background: "#eda909", color: "black", textAlign: "center", fontWeight: 800 }}>{vehicle.LicensePlate}</p>
        <p>Build year: {vehicle.Year}</p>
        <p>Odo: {vehicle.Odo}</p> */}
      </Card>
    );
  });
  return <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>{vehicles}</div>;
};
