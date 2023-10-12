import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";
import { VehicleList } from "./VehicleList";
import { CreateCharacterModal } from "./CreateVehicleModal/CreateVehiclesModal";

export const VehiclesWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>
        <h2>My vehicles</h2>
        <CreateCharacterModal />
      </div>
      <VehicleList serverData={vehicles} />
    </div>
  );
};