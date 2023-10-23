"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleTrips } from "@/frontend/hooks/useVehicleTrips";
import { Vehicles } from "@prisma/client";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { format } from "date-fns";
import { BasicBarChart } from "../global/basicBarChart";

interface TotalTripsDrivenProps {
  vehicle: Vehicles;
}

export const TotalKmDrivenPerDay = ({ vehicle }: TotalTripsDrivenProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleTrips(selectedVehicle?.Id || vehicle.Id);

  if (isLoading) return <Loader isLoading />;

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  // group data by startDate on dd-MM-yy
  const groupedData =
    data
      ?.sort((a, b) => {
        const dateA = new Date(a.StartDateTime);
        const dateB = new Date(b.StartDateTime);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      })
      .reduce((acc, trip) => {
        const date = format(new Date(trip.StartDateTime), "dd-MM-yy");
        const index = acc.findIndex((item) => item.date === date);

        if (index === -1) {
          acc.push({ date, drivenKm: trip.DrivenKm });
        } else {
          acc[index].drivenKm += trip.DrivenKm;
        }
        return acc;
      }, [] as { date: string; drivenKm: number }[]) || [];

  return <BasicBarChart title="Total Kms driven per day" data={groupedData} xField="date" yField="drivenKm" syncId="tripsPerDay" height={500} />;
};
