"use client";

import { useVehicles } from "@/frontend/hooks/useVehicles";
import { Vehicles } from "@prisma/client";
import Loader from "../global/Loader/loader";
import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { VehicleCard } from "./vehicleCard";

interface VehicleListProps {
  serverData: Vehicles[];
}

export const VehicleList = ({ serverData }: VehicleListProps) => {
  const { data, isLoading } = useVehicles({ fallbackData: serverData });

  const [_, setVehicle] = useAtom(SelectedVehicleAtom);

  useEffect(() => {
    if (!data || data.length <= 0) return;
    setVehicle(data[0]);
  }, []);

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (!data) return <p>Something went wrong</p>;

  if (data?.length === 0) return <p>No vehicles added yet, use the add button to add your vehicle.</p>;

  const vehicles = data.map((vehicle) => {
    return <VehicleCard key={vehicle.Id} vehicle={vehicle} />;
  });
  return <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>{vehicles}</div>;
};
