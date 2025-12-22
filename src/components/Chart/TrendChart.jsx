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
import { useTheme } from "../../context/ThemeContext.jsx";
import { useSelector } from "react-redux";

export default function TrendChart() {

    const filters=useSelector((state)=>state.filters);
    const { data, isLoading, isError, error } = useTrendDataHook(filters);
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Card + text classes
    const cardBgClass = isDark ? "bg-dark text-light" : "bg-white text-dark";
    const textColorClass = isDark ? "text-light" : "text-dark";
    const mutedTextClass = isDark ? "text-secondary" : "text-muted";
    const badgeClass = isDark ? "badge bg-light text-dark" : "badge bg-dark text-light";

    // Chart colors
    const gridStroke = isDark ? "#333" : "#ddd";
    const axisStroke = isDark ? "#aaa" : "#555";
    const areaStroke = isDark ? "#ffffff" : "#0d6efd";
    const dotFill = isDark ? "#000000" : "#ffffff";

    const tooltipContentStyle = {
        backgroundColor: isDark ? "#090909" : "#ffffff",
        border: `1px solid ${isDark ? "#444" : "#ddd"}`,
        borderRadius: "0.5rem",
        color: isDark ? "#ffffff" : "#000000",
        fontSize: "0.75rem",
    };

    const tooltipLabelStyle = {
        color: isDark ? "#aaaaaa" : "#555555",
    };

    if (!filters.location) {
        return (
            <div className={`card ${cardBgClass} border-secondary`}>
                <div className="card-body">
                    <p className={`small ${mutedTextClass} mb-0`}>
                        Set a <span className={textColorClass}>location</span> and filters to see the analysis.
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={`card ${cardBgClass} border-secondary`}>
                <div className="card-body">
                    <p className={`small ${textColorClass} mb-0`}>Loading chart...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={`card ${cardBgClass} border-danger`}>
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
            <div className={`card ${cardBgClass} border-secondary`}>
                <div className="card-body">
                    <p className={`small ${mutedTextClass} mb-0`}>
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
        <div className={`card ${cardBgClass} border-secondary shadow-sm`}>
            <div className="card-header d-flex justify-content-between align-items-center border-secondary">
                <div>
                    <h2 className="h6 mb-1">
                        {filters.propertyType?.toUpperCase()} – {titleMetric}
                    </h2>
                    <small className={mutedTextClass}>
                        {filters.location}{" "}
                        {filters.year ? `· Year ${filters.year}` : "· All Years"}
                    </small>
                </div>
                <div className={`text-end small ${textColorClass}`}>
                    <span className={badgeClass}>Rate trend</span>
                </div>
            </div>

            <div className="card-body" style={{ height: "320px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={areaStroke}
                                    stopOpacity={isDark ? 0.8 : 0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={areaStroke}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                        <XAxis
                            dataKey="year"
                            stroke={axisStroke}
                            tickLine={false}
                            axisLine={{ stroke: axisStroke }}
                        />
                        <YAxis
                            stroke={axisStroke}
                            tickLine={false}
                            axisLine={{ stroke: axisStroke }}
                            tickFormatter={(v) => Math.round(v)}
                        />
                        <Tooltip
                            contentStyle={tooltipContentStyle}
                            labelStyle={tooltipLabelStyle}
                            formatter={(value) => [value, "Rate"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={areaStroke}
                            strokeWidth={2}
                            fill="url(#trendArea)"
                            dot={{ r: 3, stroke: areaStroke, fill: dotFill }}
                            activeDot={{ r: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
