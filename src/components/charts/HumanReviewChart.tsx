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
  AIAnalytics,
} from "../../types/analytics";

interface Props {
  data: AIAnalytics[];
}

export function HumanReviewChart({
  data,
}: Props) {
  const chartData = data.map((item) => ({
    name: item.claim_type_name,
    required: item.human_review_required,
    notRequired:
      item.human_review_not_required,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
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
            dataKey="name"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="required"
            name="Human review required"
            stackId="review"
            radius={[
              8,
              8,
              0,
              0,
            ]}
          />

          <Bar
            dataKey="notRequired"
            name="No human review flag"
            stackId="review"
            radius={[
              0,
              0,
              8,
              8,
            ]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}