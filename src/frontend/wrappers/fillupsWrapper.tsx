import { FuelEfficiencyChart } from "../components/dashboard/fillups/fuelEfficiencyChart";
// import { Fillups } from "./fillups";
import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";
import { FuelTotalCostsChart } from "../components/dashboard/fillups/fuelTotalCostsChart";
import { TotalKmsDrivenPerFillup } from "../components/dashboard/fillups/totalKmsDrivenPerFillup";
import { LiterPricesOverTime } from "../components/dashboard/fillups/literPricesOverTime";
import { Box, Typography } from "@mui/material";
import { FuelCostsPerKmChart } from "../components/dashboard/fillups/fuelCostsPerKm";

export const FillupsWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found</p>;
  }

  return (
    <Box>
      <Typography variant="h4" align="center">
        Fillups
      </Typography>
      <Box sx={{ margin: "20px 0", display: "flex", flexWrap: "wrap", gap: "50px" }}>
        <FuelEfficiencyChart vehicle={vehicles[0]} />
        <FuelTotalCostsChart vehicle={vehicles[0]} />
        <FuelCostsPerKmChart vehicle={vehicles[0]} />
        <TotalKmsDrivenPerFillup vehicle={vehicles[0]} />
        <LiterPricesOverTime vehicle={vehicles[0]} />
      </Box>
      {/* <Fillups firstLoadVehicle={vehicles[0]} /> */}
    </Box>
  );
};
