import { useSWR, SwrOptions } from "./useSWR";
import { getVehicleFillups } from "../api/fillups/getVehicleFillups";
import { Fillup } from "@/backend/repository/fillups/findAllFillupsByVehicleId";

export const getUseVehicleFillupsKey = (vehicleId: string) => `useFillups${vehicleId}`;
export const useVehicleFillups = (vehicleId: string, options?: SwrOptions<any>) => {
  return useSWR<Fillup[]>(getUseVehicleFillupsKey(vehicleId), () => getVehicleFillups(vehicleId), options);
};
