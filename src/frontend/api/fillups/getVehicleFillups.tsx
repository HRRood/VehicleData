import { api } from "../api";

export const getVehicleFillups = async (vehicleId: number) => {
  const url = `/api/fillups/${vehicleId}`;
  const response = await api.get(url);
  return response.data;
};
