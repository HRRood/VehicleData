import { Trips } from "@prisma/client";
import { useSWR, SwrOptions } from "./useSWR";
import { getVehicleTrips } from "../api/trips/getVehicleTrips";

export const getUseVehicleTripsKey = (vehicleId: number) => `useTrips${vehicleId}`;
export const useVehicleTrips = (vehicleId: number, options?: SwrOptions<any>) => {
  return useSWR<Trips[]>(getUseVehicleTripsKey(vehicleId), () => getVehicleTrips(vehicleId), options);
};
