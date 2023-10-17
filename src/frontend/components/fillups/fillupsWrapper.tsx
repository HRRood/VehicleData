import { Fillups } from "./fillups";
import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";

export const FillupsWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found</p>;
  }

  return (
    <div>
      <h2>Fillips</h2>
      <Fillups firstLoadVehicle={vehicles[0]} />
    </div>
  );
};
