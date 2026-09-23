import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  PolicyTypeAnalytics,
} from "../../types/analytics";

interface Props {
  data: PolicyTypeAnalytics[];
}

export function ClaimsByPolicyTypeChart({
  data,
}: Props) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
          />

          <XAxis
            type="number"
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            type="category"
            dataKey="policy_type"
            width={110}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="total_claims"
            name="Claims"
            radius={[
              0,
              8,
              8,
              0,
            ]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}