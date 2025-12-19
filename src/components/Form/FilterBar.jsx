// src/components/Form/FilterBar.jsx
import { useTrendContext } from "../../context/TrendContext.jsx";

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

  const handleChange = (key) => (e) => {
    const value = e.target.value;

    // If percentile selected, clear metric; if percentile cleared, default metric=weighted
    if (key === "percentile") {
      setFilters((prev) => ({
        ...prev,
        percentile: value,
        metric: value ? "" : "weighted",
      }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-end border border-gray-600 rounded-lg p-4">
      <div className="flex flex-col text-sm gap-1">
        <label>Location</label>
        <input
          className="bg-transparent border border-gray-500 px-2 py-1 rounded"
          placeholder="e.g. Baner"
          value={filters.location}
          onChange={handleChange("location")}
        />
      </div>

      <div className="flex flex-col text-sm gap-1">
        <label>Property Type</label>
        <select
          className="bg-black text-white border border-gray-500 px-2 py-1 rounded"
          value={filters.propertyType}
          onChange={handleChange("propertyType")}
        >
          {propertyTypes.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col text-sm gap-1">
        <label>Year</label>
        <select
          className="bg-black text-white border border-gray-500 px-2 py-1 rounded"
          value={filters.year}
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

      <div className="flex flex-col text-sm gap-1">
        <label>Percentile</label>
        <select
          className="bg-black text-white border border-gray-500 px-2 py-1 rounded"
          value={filters.percentile}
          onChange={handleChange("percentile")}
        >
          {percentiles.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col text-sm gap-1">
        <label>Weighted Average</label>
        <input
          type="checkbox"
          checked={filters.metric === "weighted"}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              metric: e.target.checked ? "weighted" : "",
              percentile: e.target.checked ? "" : prev.percentile,
            }))
          }
        />
      </div>
    </div>
  );
}
