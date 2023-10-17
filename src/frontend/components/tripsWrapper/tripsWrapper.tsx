import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";
import { Trips } from "./trips";

export const TripsWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found</p>;
  }

  return (
    <div>
      <h2>Trips</h2>
      <Trips firstLoadVehicle={vehicles[0]} />
    </div>
  );
};
