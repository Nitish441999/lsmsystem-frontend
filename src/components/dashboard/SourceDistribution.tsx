import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchSourceDistribution } from "../../fethure/leadChart/leadChatSlice";

const COLORS: Record<string, string> = {
  Website: "hsl(199, 89%, 48%)",
  "Meta Ads": "hsl(262, 83%, 58%)",
  "Google Ads": "hsl(142, 71%, 45%)",
};

export function SourceDistribution() {
  const dispatch = useAppDispatch();

  const { sourceDistribution, loading } = useAppSelector(
    (state: RootState) => state.chart
  );

  useEffect(() => {
    dispatch(fetchSourceDistribution());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 text-center">
        Loading chart...
      </div>
    );
  }

  if (!sourceDistribution || sourceDistribution.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 text-center">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Source Distribution
        </h3>
        <p className="text-sm text-muted-foreground">
          Lead breakdown by platform
        </p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={sourceDistribution} // ✅ DIRECT API DATA
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
          >
            {sourceDistribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || "#8884d8"}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />

          <Legend
            formatter={(value) => (
              <span className="text-foreground text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
