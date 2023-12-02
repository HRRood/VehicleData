'use client';

import { SelectedVehicleAtom } from '@/frontend/atoms/selectedVehicleAtom';
import { useVehicleFillups } from '@/frontend/hooks/useVehicleFillups';
import { Vehicle } from '@/frontend/hooks/useVehicles';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import Loader from '../../global/Loader/loader';
import { BasicAreaChart } from '../global/basicAreaChart';
import { Box } from '@mui/material';

interface FuelEfficiencyChartProps {
  vehicle: Vehicle;
}

export const FuelEfficiencyChart = ({ vehicle }: FuelEfficiencyChartProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.id || vehicle?.id);

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  const mappedData =
    data?.map((fillup) => {
      return {
        date: format(new Date(fillup.date), 'dd-MM-yy'),
        efficiency: fillup.efficiency,
      };
    }) || [];

  return (
    <Box sx={{ position: 'relative', minWidth: { xs: '300px', sm: '400px', md: '500px' }, flex: 1 }}>
      <Loader isLoading={isLoading} />
      <BasicAreaChart
        title="Fuel efficiency KM/L"
        data={mappedData}
        xField="date"
        yField="efficiency"
        syncId="fillups"
      />
    </Box>
  );
};
