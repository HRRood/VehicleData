"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleTrips } from "@/frontend/hooks/useVehicleTrips";
import { Vehicles } from "@prisma/client";
import { format } from "date-fns";
import { useAtom } from "jotai";
import Loader from "../global/Loader/loader";
import { Box } from "@mui/material";

interface TripsProps {
  firstLoadVehicle: Vehicles;
}

export const Trips = ({ firstLoadVehicle }: TripsProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleTrips(selectedVehicle?.Id || firstLoadVehicle.Id);
  const trips = data?.map((trip) => {
    return (
      <Box border={1} borderColor="primary.main" padding={2} flex={1} minWidth="300px" key={trip.Id}>
        <p>Driven: {trip.DrivenKm}km</p>
        <p>Starttime: {format(new Date(trip.StartDateTime), "dd-MM-yy hh:mm")}</p>
        <p>Endtime: {format(new Date(trip.EndDateTime), "dd-MM-yy hh:mm")}</p>
        <p>Start location: {trip.StartLocation}</p>
        <p>Destination: {trip.EndLocation}</p>
      </Box>
    );
  });

  if (isLoading) return <Loader isLoading={isLoading} />;

  return <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>{trips}</div>;
};
