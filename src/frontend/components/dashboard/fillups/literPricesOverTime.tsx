'use client';

import { SelectedVehicleAtom } from '@/frontend/atoms/selectedVehicleAtom';
import { useVehicleFillups } from '@/frontend/hooks/useVehicleFillups';
import { useAtom } from 'jotai';
import Loader from '../../global/Loader/loader';
import { format } from 'date-fns';
import { BasicAreaChart } from '../global/basicAreaChart';
import { Vehicle } from '@/frontend/hooks/useVehicles';
import { Box } from '@mui/material';

interface LiterPricesOverTimeProps {
  vehicle: Vehicle;
}

export const LiterPricesOverTime = ({ vehicle }: LiterPricesOverTimeProps) => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.id || vehicle?.id);

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  const mappedData =
    data?.map((fillup) => {
      return {
        date: format(new Date(fillup.date), 'dd-MM-yy'),
        literPrice: Math.round((fillup.costs / fillup.litersFilled) * 100) / 100,
      };
    }) || [];

  return (
    <Box sx={{ position: 'relative', minWidth: { xs: '300px', sm: '400px', md: '500px' }, flex: 1 }}>
      <Loader isLoading={isLoading} />
      <BasicAreaChart title="Liter prices" data={mappedData} xField="date" yField="literPrice" syncId="fillups" />
    </Box>
  );
};
