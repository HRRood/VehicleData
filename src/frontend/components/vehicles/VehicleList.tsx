"use client";

import { useVehicles } from "@/frontend/hooks/useVehicles";
import Loader from "../global/Loader/loader";
import { VehicleCard } from "./vehicleCard";

export const VehicleList = () => {
  const { data, isLoading } = useVehicles();

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (!data) return <p>Something went wrong</p>;

  if (data?.length === 0) return <p>No vehicles added yet, use the add button to add your vehicle.</p>;

  const vehicles = data.map((vehicle, i) => {
    return <VehicleCard key={vehicle.Id} vehicle={vehicle} index={i} />;
  });
  return <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>{vehicles}</div>;
};
