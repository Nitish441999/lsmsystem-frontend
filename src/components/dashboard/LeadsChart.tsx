import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchWeeklyChart } from "../../fethure/leadChart/leadChatSlice";

export function LeadsChart() {
  const dispatch = useAppDispatch();

  const { weeklyData } = useAppSelector((state: RootState) => state.chart);

  useEffect(() => {
    dispatch(fetchWeeklyChart());
  }, [dispatch]);

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Leads Overview
          </h3>
          <p className="text-sm text-muted-foreground">
            Weekly lead acquisition by source
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
            Week
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
            Month
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={weeklyData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(199, 89%, 48%)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(199, 89%, 48%)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(262, 83%, 58%)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(262, 83%, 58%)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(142, 71%, 45%)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(142, 71%, 45%)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="name"
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <YAxis className="text-muted-foreground" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="website"
            stroke="hsl(199, 89%, 48%)"
            fillOpacity={1}
            fill="url(#colorWebsite)"
            strokeWidth={2}
            name="Website"
          />
          <Area
            type="monotone"
            dataKey="meta"
            stroke="hsl(262, 83%, 58%)"
            fillOpacity={1}
            fill="url(#colorMeta)"
            strokeWidth={2}
            name="Meta Ads"
          />
          <Area
            type="monotone"
            dataKey="google"
            stroke="hsl(142, 71%, 45%)"
            fillOpacity={1}
            fill="url(#colorGoogle)"
            strokeWidth={2}
            name="Google Ads"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
