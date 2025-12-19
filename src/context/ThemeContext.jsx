import { createContext, useContext, useState } from "react";
const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");


    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    }
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useThemeContext = () => useContext(ThemeContext);

