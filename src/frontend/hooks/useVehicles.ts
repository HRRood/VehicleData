import { useSWR, SwrOptions } from "./useSWR";
import { getVehicles } from "../api/vehicles/getVehicles";

export interface FireBaseVehicle {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  odometer: number;
  userId: string;
  image: string;
}
export interface Vehicle extends FireBaseVehicle {
  id: string;
}

export const getUseVehiclesKey = () => `useVehicles`;
export const useVehicles = (options?: SwrOptions<any>) => {
  return useSWR<Vehicle[]>(getUseVehiclesKey(), () => getVehicles(), options);
};
