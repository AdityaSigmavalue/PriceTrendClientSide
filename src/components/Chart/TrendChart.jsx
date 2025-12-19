// src/components/Chart/TrendChart.jsx
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";


import { useTrendDataHook } from "../../hooks/useTrendData.js";

export default function TrendChart() {
    const { data, isLoading, isError, error, filters } = useTrendDataHook();

    if (!filters.location) {
        return <p className="text-sm text-gray-400">Enter a location to see the chart.</p>;
    }

    if (isLoading) return <p>Loading chart...</p>;
    if (isError) return <p className="text-red-400 text-sm">Error: {error?.message}</p>;

    const chartData = (data?.data || []).map((d) => ({
        year: d.year,
        value: d.value,
    }));

    if (!chartData.length) {
        return <p className="text-sm text-gray-400">No data for selected filters.</p>;
    }

    return (
        <div className="border border-gray-600 rounded-lg p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="year" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#111", border: "1px solid #555", color: "#fff" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={2}
                        dot={{ r: 3, stroke: "#fff", fill: "#000" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
