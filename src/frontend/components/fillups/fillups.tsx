"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { Vehicles } from "@prisma/client";
import { format } from "date-fns";
import { useAtom } from "jotai";
import Loader from "../global/Loader/loader";

interface FillupsProps {
  firstLoadVehicle: Vehicles;
}

export const Fillups = ({ firstLoadVehicle }: FillupsProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.Id || firstLoadVehicle.Id);
  const fillups = data?.map((fillup) => {
    return (
      <div key={fillup.Id}>
        <p>{format(new Date(fillup.Date), "dd-MM-yyyy")}</p>
        <p>{fillup.DrivenKm}</p>
        <p>{fillup.LitersFilled}</p>
        <p>{fillup.Costs}</p>
        <p>{fillup.FuelEfficiency}</p>
      </div>
    );
  });

  if (isLoading) return <Loader isLoading={isLoading} />;

  return <div>{fillups}</div>;
};
