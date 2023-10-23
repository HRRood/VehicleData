"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { Vehicles } from "@prisma/client";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { format } from "date-fns";
import { BasicAreaChart } from "../global/basicAreaChart";

interface FuelCostsPerKmChartProps {
  vehicle: Vehicles;
}

export const FuelCostsPerKmChart = ({ vehicle }: FuelCostsPerKmChartProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.Id || vehicle?.Id);

  if (isLoading) {
    return <Loader isLoading />;
  }

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  const mappedData =
    data?.map((fillup) => {
      return {
        date: format(new Date(fillup.Date), "dd-MM-yy"),
        costs: Math.round((fillup.LitersFilled / fillup.DrivenKm) * 10000) / 10000,
      };
    }) || [];

  return <BasicAreaChart title="Total costs per km" data={mappedData} xField="date" yField="costs" syncId="fillups" />;
};
