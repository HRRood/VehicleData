import { Fillups } from "./fillups";
import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";

export const FillupsWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found</p>;
  }

  return <Fillups firstLoadVehicle={vehicles[0]} />;
};
