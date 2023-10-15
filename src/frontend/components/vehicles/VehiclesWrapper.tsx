import { VehicleList } from "./VehicleList";
import { CreateVehicleModal } from "./CreateVehicleModal/CreateVehiclesModal";

export const VehiclesWrapper = async () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", marginBottom: "20px" }}>
        <h2>My vehicles</h2>
        <CreateVehicleModal />
      </div>
      <VehicleList />
    </div>
  );
};
