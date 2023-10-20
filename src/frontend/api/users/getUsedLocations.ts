import { api } from "../api";

export const getUsedLocations = async () => {
  const url = `/api/locations`;
  const response = await api.get(url);
  return response.data;
};
