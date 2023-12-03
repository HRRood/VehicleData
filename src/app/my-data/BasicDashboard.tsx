import { getFillupCountForVehicle } from '@/backend/repository/fillups/getFillupCountForVehicle';
import { GetAllVehiclesOfUser } from '@/backend/repository/vehicles/getAllVehiclesOfUser';
import { Box } from '@mui/material';
import { VehicleCount } from './VehicleCount';
import { FillupsCount } from './FillupsCount';
import { getVehicleCount } from '@/backend/repository/vehicles/getVehicleCount';

interface BasicDashboardProps {}

export const BasicDashboard = async ({}: BasicDashboardProps) => {
  const vehicles = await GetAllVehiclesOfUser();
  const fillupCount = await getFillupCountForVehicle(vehicles[0].id);
  const vehiclesCount = await getVehicleCount();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '20px 0' }}>
      <VehicleCount initalCount={vehiclesCount} vehicleId={vehicles[0].id} />
      <FillupsCount initalCount={fillupCount} vehicleId={vehicles[0].id} />
    </Box>
  );
};
