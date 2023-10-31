"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { format } from "date-fns";
import { useAtom } from "jotai";
import Loader from "../global/Loader/loader";
import { Box } from "@mui/material";
import { Vehicle } from "@/frontend/hooks/useVehicles";

interface FillupsProps {
  firstLoadVehicle: Vehicle;
}

export const Fillups = ({ firstLoadVehicle }: FillupsProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.id || firstLoadVehicle.id);
  const fillups = data?.map((fillup) => {
    return (
      <Box border={1} borderColor="primary.main" padding={2} flex={1} minWidth="300px" key={fillup.id}>
        <p>Date: {format(new Date(fillup.date), "dd-MM-yyyy")}</p>
        <p>Driven: {fillup.drivenKm}km</p>
        <p>L Filled:{fillup.litersFilled}L</p>
        <p>Costs: {fillup.costs}</p>
        <p>KM per L: {fillup.efficiency}</p>
      </Box>
    );
  });

  if (isLoading) return <Loader isLoading={isLoading} />;

  return <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>{fillups}</div>;
};
