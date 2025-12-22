// src/hooks/useUrlFilters.js
import { useSearchParams } from "react-router-dom";

const DEFAULT_FILTERS = {
    location: "Baner",
    propertyType: "office",
    year: "",
    percentile: "",
    metric: "weighted",
};

export function useUrlFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filtersFromUrl = {
        location: searchParams.get("location") || DEFAULT_FILTERS.location,
        propertyType: searchParams.get("propertyType") || DEFAULT_FILTERS.propertyType,
        year: searchParams.get("year") || DEFAULT_FILTERS.year,
        percentile: searchParams.get("percentile") || DEFAULT_FILTERS.percentile,
        metric: searchParams.get("metric") || DEFAULT_FILTERS.metric,
    };

    const setFiltersInUrl = (nextFilters) => {
        const params = new URLSearchParams();

        Object.entries(nextFilters).forEach(([key, value]) => {
            if (value !== "" && value != null) {
                params.set(key, value);
            }
        });

        setSearchParams(params, { replace: true });
    };

    return { filtersFromUrl, setFiltersInUrl };
}