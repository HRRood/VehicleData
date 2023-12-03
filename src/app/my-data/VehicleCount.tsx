'use client';

import { NumberCard } from '@/frontend/components/dashboard/global/numberCard';

interface VehicleCountProps {
  vehicleId: string;
  initalCount: number;
}

export const VehicleCount = ({ initalCount, vehicleId }: VehicleCountProps) => {
  console.log(vehicleId);

  return <NumberCard title="Total cars" value={initalCount} />;
};
