import { useTheme } from "@/frontend/hooks/useTheme";
import { Box } from "@mui/material";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

interface BasicBarChartProps {
  title: string;
  data: any[];
  xField: string;
  yField: string;
  syncId: string;
  height?: number;
}

export const BasicBarChart = ({ title, data, xField, yField, syncId, height = 300 }: BasicBarChartProps) => {
  const { colors } = useTheme();
  const isMultiBar = yField.includes(",");
  const fillColors = [colors.primary, colors.secondary, colors.lightPrimary, colors.lightSecondary];
  const strokeColors = [colors.darkPrimary, colors.darkSecondary, colors.primary, colors.secondary];

  return (
    <Box sx={{ minWidth: { xs: "300px", sm: "400px", md: "500px" } }} style={{ textAlign: "center", width: "fit-content", flex: 1 }}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} syncId={syncId}>
          <XAxis stroke={colors.text} dataKey={xField} />
          <YAxis stroke={colors.text} width={35} />
          <Tooltip />
          {!isMultiBar && <Bar type="monotone" dataKey={yField} strokeWidth={3} stroke={colors.primary} fill={colors.darkPrimary} fillOpacity={0.5} />}
          {isMultiBar &&
            yField
              .split(",")
              .map((field, index) => (
                <Bar
                  key={index}
                  type="monotone"
                  dataKey={field}
                  strokeWidth={3}
                  stroke={strokeColors[index % strokeColors.length]}
                  fill={fillColors[index % fillColors.length]}
                  fillOpacity={0.5}
                />
              ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
