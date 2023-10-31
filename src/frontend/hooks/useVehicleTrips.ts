import { useSWR, SwrOptions } from "./useSWR";
import { getVehicleTrips } from "../api/trips/getVehicleTrips";
import { Trip } from "@/backend/repository/trips/findAllTripsByVehicleId";

export const getUseVehicleTripsKey = (vehicleId: string) => `useTrips${vehicleId}`;
export const useVehicleTrips = (vehicleId: string, options?: SwrOptions<any>) => {
  return useSWR<Trip[]>(getUseVehicleTripsKey(vehicleId), () => getVehicleTrips(vehicleId), options);
};
