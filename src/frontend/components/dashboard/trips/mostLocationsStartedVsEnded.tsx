"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleTrips } from "@/frontend/hooks/useVehicleTrips";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { BasicBarChart } from "../global/basicBarChart";
import { Vehicle } from "@/frontend/hooks/useVehicles";

interface MostLocationsStartedVsEndedProps {
  vehicle: Vehicle;
}

export const MostLocationsStartedVsEnded = ({ vehicle }: MostLocationsStartedVsEndedProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleTrips(selectedVehicle?.id || vehicle.id);

  if (isLoading) return <Loader isLoading />;

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  const mappedData =
    data
      ?.reduce((acc, trip) => {
        const { start, end } = trip;
        const index = acc.findIndex((item) => item.location === start);
        if (index === -1) {
          acc.push({ location: start, started: 1, ended: 0 });
        } else {
          acc[index].started += 1;
        }

        const index2 = acc.findIndex((item) => item.location === end);
        if (index2 === -1) {
          acc.push({ location: end, started: 0, ended: 1 });
        } else {
          acc[index2].ended += 1;
        }
        return acc;
      }, [] as { location: string; started: number; ended: number }[])
      .sort((a, b) => {
        if (a.started < b.started) return 1;
        if (a.started > b.started) return -1;
        return 0;
      }) || [];

  return <BasicBarChart title="Total Kms driven per day" data={mappedData} xField="location" yField="started,ended" syncId="locationsVisited" height={500} />;
};
