import { api } from "../api";

export const getVehicles = async () => {
  const url = `/api/vehicles`;
  const response = await api.get(url);
  return response.data;
};
