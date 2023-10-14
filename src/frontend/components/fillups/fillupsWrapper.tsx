"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicles copy";
import { format } from "date-fns";
import { useAtom } from "jotai";
import Loader from "../global/Loader/loader";

export const FillupsWrapper = () => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.Id || 0);
  console.log(data);
  const fillups = data?.map((fillup) => {
    console.log(fillup.Date);
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
