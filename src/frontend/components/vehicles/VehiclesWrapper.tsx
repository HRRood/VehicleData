import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";
import { VehicleList } from "./VehicleList";
import { CreateVehicleModal } from "./CreateVehicleModal/CreateVehiclesModal";

export const VehiclesWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", marginBottom: "20px" }}>
        <h2>My vehicles</h2>
        <CreateVehicleModal />
      </div>
      <VehicleList serverData={vehicles} />
    </div>
  );
};
