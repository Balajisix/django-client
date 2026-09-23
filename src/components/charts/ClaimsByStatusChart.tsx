import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type {
  ClaimStatusAnalytics,
} from "../../types/analytics";

interface Props {
  data: ClaimStatusAnalytics[];
}

const STATUS_COLORS = [
  "#64748b",
  "#8b5cf6",
  "#f59e0b",
  "#3b82f6",
  "#10b981",
  "#ef4444",
  "#06b6d4",
  "#f97316",
];

export function ClaimsByStatusChart({
  data,
}: Props) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="total_claims"
            nameKey="claim_status"
            cx="50%"
            cy="45%"
            outerRadius={90}
            innerRadius={55}
            paddingAngle={2}
          >
            {data.map((item, index) => (
              <Cell
                key={item.claim_status}
                fill={
                  STATUS_COLORS[
                    index %
                      STATUS_COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}