// src/components/layout/PageLayout.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { HiMoon, HiSun } from 'react-icons/hi';
const PageLayout = ({ title, children }) => {
  const { theme, toggleTheme } = useTheme();

  const bgClass = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`${bgClass} min-vh-180`}>
      <div className="container py-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {/* Title wrapper grows and centers text */}
          <div className="flex-grow-1 text-center">
            <h1 className="h4 fw-semibold mb-0">{title}</h1>
          </div>

          {/* Toggle button stays to the right */}
          <button
            type="button"
            className={`btn btn-sm px-3 py-1 rounded-full ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <HiSun /> : <HiMoon />}
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
