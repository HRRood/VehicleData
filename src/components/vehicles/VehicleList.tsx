"use client";

import { useVehicles } from "@/frontend/hooks/useVehicles";
import { Vehicles } from "@prisma/client";
import Loader from "../global/Loader/loader";

interface VehicleListProps {
  serverData: Vehicles[];
}

export const VehicleList = ({ serverData }: VehicleListProps) => {
  const { data, isLoading } = useVehicles({ fallbackData: serverData });

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (!data) return <p>Something went wrong</p>;

  if (data?.length === 0) return <p>No vehicles added yet, use the add button to add your vehicle.</p>;

  const vehicles = data.map((vehicle) => {
    return (
      <div key={vehicle.Id}>
        {vehicle.Make} {vehicle.Model}
      </div>
    );
  });
  return <div>{vehicles}</div>;
};
