import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  MonthlyClaimTrend,
} from "../../types/analytics";

import {
  formatCurrency,
  formatDate,
} from "../../lib/formatters";

interface Props {
  data: MonthlyClaimTrend[];
}

export function ClaimsMonthlyTrendChart({
  data,
}: Props) {
  const chartData = data.map((item) => ({
    month: formatDate(item.month_start),
    claims: item.total_claims,
    estimatedLoss: Number(
      item.total_estimated_loss ?? 0,
    ),
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={chartData}
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
            dataKey="month"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) =>
              `₹${Math.round(
                value / 1000,
              )}K`
            }
          />

          <Tooltip
            formatter={(
              value,
              name,
            ) => {
              if (
                name ===
                "estimatedLoss"
              ) {
                return [
                  formatCurrency(
                    Number(value),
                  ),
                  "Estimated Loss",
                ];
              }

              return [
                value,
                "Claims",
              ];
            }}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="claims"
            name="Claims"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="estimatedLoss"
            name="Estimated Loss"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}