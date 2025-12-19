


import { createContext, useContext, useState } from "react";

const TrendContext = createContext(null);

export const TrendProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        location: "",
        year: "",
        propertyType: "",
        percentile: "",
        metric: "weighted",
    });

    return (
        <TrendContext.Provider value={{ filters, setFilters }}>
            {children}
        </TrendContext.Provider>
    )
}

export const useTrendContext = () => useContext(TrendContext);