import { api } from "../api";

export const getVehicleFillups = async (vehicleId: string) => {
  const url = `/api/fillups/${vehicleId}`;
  const response = await api.get(url);
  return response.data;
};
