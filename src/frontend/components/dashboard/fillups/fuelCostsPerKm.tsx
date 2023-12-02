'use client';

import { SelectedVehicleAtom } from '@/frontend/atoms/selectedVehicleAtom';
import { useVehicleFillups } from '@/frontend/hooks/useVehicleFillups';
import { useAtom } from 'jotai';
import Loader from '../../global/Loader/loader';
import { format } from 'date-fns';
import { BasicAreaChart } from '../global/basicAreaChart';
import { Vehicle } from '@/frontend/hooks/useVehicles';
import { Box } from '@mui/material';

interface FuelCostsPerKmChartProps {
  vehicle: Vehicle;
}

export const FuelCostsPerKmChart = ({ vehicle }: FuelCostsPerKmChartProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.id || vehicle?.id);

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  const mappedData =
    data?.map((fillup) => {
      return {
        date: format(new Date(fillup.date), 'dd-MM-yy'),
        costs: Math.round((fillup.litersFilled / fillup.drivenKm) * 10000) / 10000,
      };
    }) || [];

  return (
    <Box sx={{ position: 'relative', minWidth: { xs: '300px', sm: '400px', md: '500px' }, flex: 1 }}>
      <Loader isLoading={isLoading} />
      <BasicAreaChart title="Total costs per km" data={mappedData} xField="date" yField="costs" syncId="fillups" />
    </Box>
  );
};
