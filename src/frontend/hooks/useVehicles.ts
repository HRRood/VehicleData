import { Vehicles } from "@prisma/client";
import { useSWR, SwrOptions } from "./useSWR";
import { getVehicles } from "../api/vehicles/getVehicles";

export const getUseVehiclesKey = () => `useVehicles`;
export const useVehicles = (options?: SwrOptions<any>) => {
  return useSWR<Vehicles[]>(getUseVehiclesKey(), () => getVehicles(), options);
};
