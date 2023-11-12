"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleTrips } from "@/frontend/hooks/useVehicleTrips";
import { format } from "date-fns";
import { useAtom } from "jotai";
import Loader from "../global/Loader/loader";
import { Box } from "@mui/material";
import { Vehicle } from "@/frontend/hooks/useVehicles";

interface TripsProps {
  firstLoadVehicle: Vehicle;
}

export const Trips = ({ firstLoadVehicle }: TripsProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleTrips(selectedVehicle?.id || firstLoadVehicle.id);
  const trips = data?.map((trip) => {
    return (
      <Box border={1} borderColor="primary.main" padding={2} flex={1} minWidth="300px" key={trip.id}>
        <p>Driven: {trip.drivenKm}km</p>
        <p>Starttime: {format(new Date(trip.startTime), "dd-MM-yy hh:mm")}</p>
        <p>Endtime: {format(new Date(trip.endTime), "dd-MM-yy hh:mm")}</p>
        <p>Start location: {trip.start}</p>
        <p>Destination: {trip.end}</p>
      </Box>
    );
  });

  if (isLoading) return <Loader isLoading={isLoading} />;

  return <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>{trips}</div>;
};
