import { useSWR, SwrOptions } from "./useSWR";
import { getUsedLocations } from "../api/users/getUsedLocations";

export const getUseLocationsKey = () => "useLocations";
export const useLocations = (options?: SwrOptions<any>) => {
  return useSWR<string[]>(getUseLocationsKey(), () => getUsedLocations(), options);
};
