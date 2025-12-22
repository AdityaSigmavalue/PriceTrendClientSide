// src/hooks/useSyncFiltersWithUrl.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilters as setFiltersAction } from "../store/filtersSlice.js";

export function useSyncFiltersWithUrl() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  // 1. On first mount or URL change, hydrate Redux from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const urlFilters = {
      location: params.get("location") || "",
      propertyType: params.get("propertyType") || "flat",
      year: params.get("year") || "",
      percentile: params.get("percentile") || "",
      metric: params.get("metric") || "weighted",
    };

    // only dispatch if something actually differs
    const changed =
      urlFilters.location !== filters.location ||
      urlFilters.propertyType !== filters.propertyType ||
      urlFilters.year !== filters.year ||
      urlFilters.percentile !== filters.percentile ||
      urlFilters.metric !== filters.metric;

    if (changed) {
      dispatch(setFiltersAction(urlFilters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // depend on URL, not filters, to avoid loops

  // 2. When Redux filters change, push them to URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.location) params.set("location", filters.location);
    if (filters.propertyType && filters.propertyType !== "flat")
      params.set("propertyType", filters.propertyType);
    if (filters.year) params.set("year", filters.year);
    if (filters.percentile) params.set("percentile", filters.percentile);
    if (filters.metric && filters.metric !== "weighted")
      params.set("metric", filters.metric);

    const search = params.toString();
    const newSearch = search ? `?${search}` : "";

    if (newSearch !== location.search) {
      navigate({ search: newSearch }, { replace: true });
    }
  }, [filters, location.search, navigate]);
}
