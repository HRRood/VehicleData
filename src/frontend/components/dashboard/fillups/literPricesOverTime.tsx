"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { Vehicles } from "@prisma/client";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { format } from "date-fns";
import { BasicAreaChart } from "../global/basicAreaChart";

interface LiterPricesOverTimeProps {
  vehicle: Vehicles;
}

export const LiterPricesOverTime = ({ vehicle }: LiterPricesOverTimeProps) => {
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
        literPrice: Math.round((fillup.Costs / fillup.LitersFilled) * 100) / 100,
      };
    }) || [];

  return <BasicAreaChart title="Liter prices" data={mappedData} xField="date" yField="literPrice" />;
};
