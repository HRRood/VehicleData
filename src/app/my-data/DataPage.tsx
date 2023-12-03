import { VehicleList } from '@/frontend/components/vehicles/VehicleList';
import { Box } from '@mui/material';
import { BasicDashboard } from './BasicDashboard';

export const DataPage = async () => {
  return (
    <Box>
      <VehicleList />
      <BasicDashboard />
    </Box>
  );
};
