"use client";

import { useVehicles } from "@/frontend/hooks/useVehicles";
import Loader from "../global/Loader/loader";
import { VehicleCard } from "./vehicleCard";
import { useAtom } from "jotai";
import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useEffect } from "react";

export const VehicleList = () => {
  const { data, isLoading } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useAtom(SelectedVehicleAtom);

  useEffect(() => {
    if (selectedVehicle === null && data && data?.length !== 0) setSelectedVehicle(data[0]);
  }, [data, selectedVehicle, setSelectedVehicle]);

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (!data) return <p>Something went wrong</p>;

  if (data?.length === 0) return <p>No vehicles added yet, use the add button to add your vehicle.</p>;

  const vehicles = data.map((vehicle) => {
    return <VehicleCard key={vehicle.id} vehicle={vehicle} />;
  });
  return <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>{vehicles}</div>;
};
