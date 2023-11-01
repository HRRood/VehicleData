import { useTheme } from "@/frontend/hooks/useTheme";
import { Box } from "@mui/material";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";

interface BasicAreaChartProps {
  title: string;
  data: any[];
  xField: string;
  yField: string;
  syncId: string;
}

export const BasicAreaChart = ({ title, data, xField, yField, syncId }: BasicAreaChartProps) => {
  const { colors } = useTheme();

  return (
    <Box sx={{ minWidth: { xs: "300px", sm: "400px", md: "500px" } }} style={{ textAlign: "center", width: "fit-content", flex: 1 }}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} syncId={syncId}>
          <XAxis stroke={colors.text} dataKey={xField} />
          <YAxis stroke={colors.text} width={35} />
          <Tooltip />
          <Area type="monotone" dataKey={yField} strokeWidth={5} stroke={colors.primary} fill={colors.darkPrimary} fillOpacity={0.5} activeDot={{ r: 8 }} />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
