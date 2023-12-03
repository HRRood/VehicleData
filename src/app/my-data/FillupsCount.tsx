'use client';

import { NumberCard } from '@/frontend/components/dashboard/global/numberCard';

interface FillupsCountProps {
  vehicleId: string;
  initalCount: number;
}

export const FillupsCount = ({ initalCount, vehicleId }: FillupsCountProps) => {
  console.log(vehicleId);
  return <NumberCard title="Total Fillups" value={initalCount} />;
};
