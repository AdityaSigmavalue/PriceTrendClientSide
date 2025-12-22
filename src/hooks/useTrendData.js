// src/hooks/useTrendData.js
import { useTrendContext } from "../context/TrendContext.jsx";
import { useTrendData as useTrendQuery } from "../api/queries";

export const useTrendDataHook = (filters) => {
    const { location, year, propertyType, percentile, metric } = filters;

    const query = useTrendQuery({
        location,
        year,
        propertyType,
        percentile,
        metric,
    });

    // if query is somehow falsy, return safe defaults
    if (!query) {
        return {
            filters,
            data: null,
            isLoading: false,
            isError: false,
            error: null,
        };
    }

    return {
        filters,
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
};
