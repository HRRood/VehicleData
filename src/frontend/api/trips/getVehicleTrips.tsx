import { api } from "../api";

export const getVehicleTrips = async (vehicleId: number) => {
  const url = `/api/trips/${vehicleId}`;
  const response = await api.get(url);
  return response.data;
};
