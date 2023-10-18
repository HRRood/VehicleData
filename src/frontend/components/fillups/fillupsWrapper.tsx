import { FuelEfficiencyChart } from "../dashboard/fillups/fuelEfficiencyChart";
import { Fillups } from "./fillups";
import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";
import { FuelTotalCostsChart } from "../dashboard/fillups/fuelTotalCostsChart";
import { TotalKmsDrivenPerFillup } from "../dashboard/fillups/totalKmsDrivenPerFillup";

export const FillupsWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found</p>;
  }

  return (
    <div>
      <div style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", gap: "50px" }}>
        <FuelEfficiencyChart vehicle={vehicles[0]} />
        <FuelTotalCostsChart vehicle={vehicles[0]} />
        <TotalKmsDrivenPerFillup vehicle={vehicles[0]} />
      </div>
      <Fillups firstLoadVehicle={vehicles[0]} />
    </div>
  );
};
