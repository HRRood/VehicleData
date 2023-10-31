"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { format } from "date-fns";
import { BasicAreaChart } from "../global/basicAreaChart";
import { Vehicle } from "@/frontend/hooks/useVehicles";

interface LiterPricesOverTimeProps {
  vehicle: Vehicle;
}

export const LiterPricesOverTime = ({ vehicle }: LiterPricesOverTimeProps) => {
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
        literPrice: Math.round((fillup.costs / fillup.litersFilled) * 100) / 100,
      };
    }) || [];

  return <BasicAreaChart title="Liter prices" data={mappedData} xField="date" yField="literPrice" syncId="fillups" />;
};
