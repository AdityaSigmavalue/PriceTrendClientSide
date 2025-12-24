// src/context/TrendContext.jsx
import { createContext, useContext, useState } from "react";
import { useUrlFilters } from "../hooks/useUrlFilterParams";


const TrendContext = createContext(null);

export const TrendProvider = ({ children }) => {
    const { filtersFromUrl, setFiltersInUrl } = useUrlFilters();

    // Initialize once from URL
    const [filters, setFilters] = useState(filtersFromUrl);

    const updateFilters = (nextFilters) => {
        setFilters(nextFilters);       
        setFiltersInUrl(nextFilters);  
    };

    return (
        <TrendContext.Provider value={{ filters, setFilters: updateFilters }}>
            {children}
        </TrendContext.Provider>
    );
};

export const useTrendContext = () => useContext(TrendContext);
