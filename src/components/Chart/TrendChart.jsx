// src/components/Chart/TrendChart.jsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useTrendDataHook } from "../../hooks/useTrendData.js";

export default function TrendChart() {
  const { data, isLoading, isError, error, filters } = useTrendDataHook();

  console.log("TrendChart filters:", filters);
  console.log("TrendChart data:", data);

  if (!filters.location) {
    return (
      <div className="card bg-black border-secondary">
        <div className="card-body">
          <p className="small text-muted mb-0">
            Set a <span className="text-light">location</span> and filters to see the analysis.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card bg-black border-secondary">
        <div className="card-body">
          <p className="small text-light mb-0">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card bg-black border-danger">
        <div className="card-body">
          <p className="small text-danger mb-0">
            Error loading data: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  const chartData = (data?.data || []).map((d) => ({
    year: d.year,
    value: d.value,
  }));

  if (!chartData.length) {
    return (
      <div className="card bg-black border-secondary">
        <div className="card-body">
          <p className="small text-muted mb-0">
            No data for the selected combination of filters.
          </p>
        </div>
      </div>
    );
  }

  const titleMetric =
    filters.metric === "weighted"
      ? "Weighted Average"
      : filters.percentile
      ? `${filters.percentile}th Percentile`
      : "Value";

  return (
    <div className="card bg-black border-secondary shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center border-secondary">
        <div>
          <h2 className="h6 mb-1">
            {filters.propertyType?.toUpperCase()} – {titleMetric}
          </h2>
          <small className="text-muted">
            {filters.location}{" "}
            {filters.year ? `· Year ${filters.year}` : "· All Years"}
          </small>
        </div>
        <div className="text-end small text-muted">
          <span className="badge bg-light text-dark">Rate trend</span>
        </div>
      </div>

      <div className="card-body" style={{ height: "320px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="#aaa"
              tickLine={false}
              axisLine={{ stroke: "#444" }}
            />
            <YAxis
              stroke="#aaa"
              tickLine={false}
              axisLine={{ stroke: "#444" }}
              tickFormatter={(v) => Math.round(v)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#090909",
                border: "1px solid #444",
                borderRadius: "0.5rem",
                color: "#fff",
                fontSize: "0.75rem",
              }}
              labelStyle={{ color: "#aaa" }}
              formatter={(value) => [value, "Rate"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
              fill="url(#trendArea)"
              dot={{ r: 3, stroke: "#fff", fill: "#000" }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
