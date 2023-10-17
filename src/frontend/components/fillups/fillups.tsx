"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { Vehicles } from "@prisma/client";
import { format } from "date-fns";
import { useAtom } from "jotai";
import Loader from "../global/Loader/loader";
import { Box } from "@mui/material";

interface FillupsProps {
  firstLoadVehicle: Vehicles;
}

export const Fillups = ({ firstLoadVehicle }: FillupsProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.Id || firstLoadVehicle.Id);
  const fillups = data?.map((fillup) => {
    return (
      <Box border={1} borderColor="primary.main" padding={2} flex={1} minWidth="300px" key={fillup.Id}>
        <p>Date: {format(new Date(fillup.Date), "dd-MM-yyyy")}</p>
        <p>Driven: {fillup.DrivenKm}km</p>
        <p>L Filled:{fillup.LitersFilled}L</p>
        <p>Costs: {fillup.Costs}</p>
        <p>KM per L: {fillup.FuelEfficiency}</p>
      </Box>
    );
  });

  if (isLoading) return <Loader isLoading={isLoading} />;

  return <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>{fillups}</div>;
};
