"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleTrips } from "@/frontend/hooks/useVehicleTrips";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { format } from "date-fns";
import { BasicBarChart } from "../global/basicBarChart";
import { Vehicle } from "@/frontend/hooks/useVehicles";

interface TotalTripsDrivenProps {
  vehicle: Vehicle;
}

export const TotalTripsDrivenPerDay = ({ vehicle }: TotalTripsDrivenProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleTrips(selectedVehicle?.id || vehicle.id);

  if (isLoading) return <Loader isLoading />;

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  // group data by startDate on dd-MM-yy
  const groupedData =
    data
      ?.sort((a, b) => {
        const dateA = new Date(a.startTime);
        const dateB = new Date(b.startTime);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      })
      .reduce((acc, curr) => {
        const date = format(new Date(curr.startTime), "dd-MM-yy");
        const index = acc.findIndex((item) => item.date === date);

        if (index === -1) {
          acc.push({ date, count: 1 });
        } else {
          acc[index].count++;
        }
        return acc;
      }, [] as { date: string; count: number }[]) || [];

  return <BasicBarChart title="Total trips driven per day" data={groupedData} xField="date" yField="count" syncId="tripsPerDay" height={500} />;
};
