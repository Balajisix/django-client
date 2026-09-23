import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ClaimTypeAnalytics } from "../../types/analytics";

interface ClaimsByTypeChartProps {
  data: ClaimTypeAnalytics[];
}

export function ClaimsByTypeChart({
  data,
}: ClaimsByTypeChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="claim_type_name"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Tooltip />

          <Bar
            dataKey="total_claims"
            name="Claims"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}