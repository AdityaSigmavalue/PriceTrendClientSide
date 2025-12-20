// src/components/Form/FilterBar.jsx
import { useState, useEffect } from "react";
import { useTrendContext } from "../../context/TrendContext.jsx";
import {  useTheme } from "../../context/ThemeContext.jsx";

const propertyTypes = [
  { value: "flat", label: "Flat" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
  { value: "others", label: "Others" },
  { value: "all", label: "All" },
];

const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
const percentiles = [
  { value: "", label: "None" },
  { value: "50", label: "50%" },
  { value: "75", label: "75%" },
  { value: "90", label: "90%" },
];

export default function FilterBar() {
  const { filters, setFilters } = useTrendContext();
  const {theme}= useTheme();

  // local draft so typing does not trigger API until submit
  const [draft, setDraft] = useState(filters);
  const bgClass = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";

  const textColorClass = theme === "dark" ? "text-light" : "text-dark";



  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const handleChange = (key) => (e) => {
    const value = e.target.value;

    if (key === "percentile") {
      setDraft((prev) => ({
        ...prev,
        percentile: value,
        metric: value ? "" : "weighted",
      }));
    } else {
      setDraft((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleWeightedToggle = (e) => {
    const checked = e.target.checked;
    setDraft((prev) => ({
      ...prev,
      metric: checked ? "weighted" : "",
      percentile: checked ? "" : prev.percentile,
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    setFilters(draft);
  };

  return (
    <form
      onSubmit={handleApply}
      className={`card ${bgClass} border-secondary shadow-sm mb-3`}
    >
      <div className={`card-header d-flex justify-content-between align-items-center border-secondary ${bgClass}`}>
        <div>
          <h2 className={`h6 mb-0 ${textColorClass}`}>Filter Configuration</h2>
          <small className={textColorClass}>
          </small>
        </div>
      </div>

      <div className="card-body">
        <div className="row g-2 align-items-end">
          {/* Location */}
          <div className="col-12 col-md-2">
            <label className={`form-label small text-uppercase ${textColorClass}`}>
              Location
            </label>
            <input
              className={`form-control form-control-sm ${bgClass} border-secondary cursor-text`}
              placeholder="e.g. Baner"
              value={draft.location}
              onChange={handleChange("location")}
            />
          </div>

          {/* Property Type */}
          <div className="col-6 col-md-3">
            <label className={`form-label small text-uppercase ${textColorClass}`}>
              Property Type
            </label>
            <select
              className={`form-select form-select-sm ${bgClass} border-secondary`}
              value={draft.propertyType}
              onChange={handleChange("propertyType")}
            >
              {propertyTypes.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="col-6 col-md-2">
            <label className={`form-label small text-uppercase ${textColorClass}`}>
              Year
            </label>
            <select
              className={`form-select form-select-sm ${bgClass} border-secondary cursor-pointer`}
              value={draft.year}
              onChange={handleChange("year")}
            >
              <option value="">All</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Percentile */}
          <div className="col-6 col-md-2">
            <label className={`form-label small text-uppercase ${textColorClass}`}>
              Percentile
            </label>
            <select
              className={`form-select form-select-sm ${bgClass} border-secondary cursor-pointer`}
              value={draft.percentile}
              onChange={handleChange("percentile")}
            > 
              {percentiles.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Weighted toggle */}
          <div className="col-6 col-md-3">
            <label className={`form-label small text-uppercase ${textColorClass} d-block`}>
              Weighted Average
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                id="weightedToggle"
                checked={draft.metric === "weighted"}
                onChange={handleWeightedToggle}
              />
              <label className="form-check-label small" htmlFor="weightedToggle">
                Use weighted rate
              </label>
            </div>
          </div>

          {/* Apply button */}
          <div className="col-12 col-md-3 mx-auto mt-2  text-end">
            <button
              type="submit"
              className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} w-100`}
              disabled={!draft.location}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </form>
  );

}
