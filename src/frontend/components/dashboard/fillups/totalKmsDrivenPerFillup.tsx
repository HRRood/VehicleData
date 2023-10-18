"use client";

import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useVehicleFillups } from "@/frontend/hooks/useVehicleFillups";
import { Vehicles } from "@prisma/client";
import { useAtom } from "jotai";
import Loader from "../../global/Loader/loader";
import { format } from "date-fns";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "@/frontend/hooks/useTheme";

interface TotalKmsDrivenPerFillupProps {
  vehicle: Vehicles;
}

export const TotalKmsDrivenPerFillup = ({ vehicle }: TotalKmsDrivenPerFillupProps) => {
  const { colors } = useTheme();
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);
  const { data, isLoading } = useVehicleFillups(selectedVehicle?.Id || vehicle?.Id);

  if (isLoading) {
    return <Loader isLoading />;
  }

  if (!isLoading && data?.length === 0) {
    return <p>No data found!</p>;
  }

  const fuelEfficiencyList = data?.map((fillup) => {
    return {
      date: format(new Date(fillup.Date), "dd-MM-yy"),
      driven: fillup.DrivenKm,
    };
  });

  return (
    <div style={{ minWidth: "300px", textAlign: "center", width: "fit-content", flex: 1 }}>
      <h3>Total driven Kms</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={fuelEfficiencyList} syncId="fillups">
          <XAxis stroke={colors.text} dataKey="date" />
          <YAxis stroke={colors.text} width={35} />
          <Tooltip />
          <Area type="monotone" dataKey="driven" strokeWidth={5} stroke={colors.primary} fill={colors.darkPrimary} fillOpacity={0.5} activeDot={{ r: 8 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
