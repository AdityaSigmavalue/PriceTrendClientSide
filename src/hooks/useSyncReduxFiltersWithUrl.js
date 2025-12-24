// src/hooks/useSyncReduxFiltersWithUrl.js
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUrlFilters } from "./useUrlFilterParams.js";
import { setFilters as setFiltersAction } from "../store/filtersSlice.js";

export function useSyncReduxFiltersWithUrl() {
    const { filtersFromUrl, setFiltersInUrl } = useUrlFilters();
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const initializedRef = useRef(false);

    // 1) On first mount, initialize Redux from URL (or defaults)
    useEffect(() => {
        if (initializedRef.current) return;

        dispatch(setFiltersAction(filtersFromUrl));
        initializedRef.current = true;
    }, [dispatch, filtersFromUrl]);

    // 2) When Redux filters change (after init), write to URL
    useEffect(() => {
        if (!initializedRef.current) return;

        setFiltersInUrl(filters);
    }, [filters, setFiltersInUrl]);
}
