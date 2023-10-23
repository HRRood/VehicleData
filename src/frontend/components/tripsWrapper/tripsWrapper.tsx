import { GetAllVehiclesOfUser } from "@/backend/repository/vehicles/getAllVehiclesOfUser";
import { Trips } from "./trips";
import { Box, Typography } from "@mui/material";
import { TotalTripsDrivenPerDay } from "../dashboard/trips/totalTripsDrivenPerDay";
import { TotalKmDrivenPerDay } from "../dashboard/trips/totalKmDrivenPerDay";
import { MostLocationsStartedVsEnded } from "../dashboard/trips/mostLocationsStartedVsEnded";

export const TripsWrapper = async () => {
  const vehicles = await GetAllVehiclesOfUser();

  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found</p>;
  }

  return (
    <Box>
      <Typography variant="h4" align="center">
        Trips
      </Typography>
      <Box sx={{ margin: "20px 0", display: "flex", flexWrap: "wrap", gap: "50px" }}>
        <TotalTripsDrivenPerDay vehicle={vehicles[0]} />
        <TotalKmDrivenPerDay vehicle={vehicles[0]} />
        <MostLocationsStartedVsEnded vehicle={vehicles[0]} />
      </Box>
      <Trips firstLoadVehicle={vehicles[0]} />
    </Box>
  );
};
