"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { format } from "date-fns";
import { BasicAreaChart } from "../global/basicAreaChart";
import { Vehicle } from "@/frontend/hooks/useVehicles";

interface TotalKmsDrivenPerFillupProps {
  vehicle: Vehicle;
}

export const TotalKmsDrivenPerFillup = ({ vehicle }: TotalKmsDrivenPerFillupProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.id || vehicle?.id);

  if (isLoading) {
    return <Loader isLoading />;
  }

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  const mappedData =
    data?.map((fillup) => {
      return {
        date: format(new Date(fillup.date), "dd-MM-yy"),
        driven: fillup.drivenKm,
      };
    }) || [];

  return <BasicAreaChart title="Total driven Kms" data={mappedData} xField="date" yField="driven" syncId="fillups" />;
};
