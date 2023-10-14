import { Fillups } from "@prisma/client";
import { useSWR, SwrOptions } from "./useSWR";
import { getVehicleFillups } from "../api/fillups/getVehicleFillups";

export const getUseVehicleFillupsKey = (vehicleId: number) => `useFillups${vehicleId}`;
export const useVehicleFillups = (vehicleId: number, options?: SwrOptions<any>) => {
  return useSWR<Fillups[]>(getUseVehicleFillupsKey(vehicleId), () => getVehicleFillups(vehicleId), options);
};
