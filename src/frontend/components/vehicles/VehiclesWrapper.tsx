import { VehicleList } from './VehicleList';
import { CreateVehicleModal } from './CreateVehicleModal/CreateVehiclesModal';
import { Box, Typography } from '@mui/material';

export const VehiclesWrapper = async () => {
  return (
    <Box sx={{ maxWidth: '1300px', margin: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h2">My vehicles</Typography>
        <CreateVehicleModal />
      </Box>
      <VehicleList />
    </Box>
  );
};
