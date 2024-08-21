import React from "react";
import { useState, useEffect } from "react";
import "../style/filter.css";

function Filter({ filters, setFilters, applyFilters }) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="filter-container">
      <h2>Filters</h2>
      <button className="filter-button" onClick={toggleFilterOptions}>
        {showFilterOptions ? "Hide Filters" : "Show Filters"}
      </button>
      {showFilterOptions && (
        <div className="filter-options">
          <div className="filter-item">
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="filter-item">
            <label>
              Min Price:
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="filter-item">
            <label>
              Max Price:
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="filter-item">
            <label>
              House Type:
              <select
                name="houseType"
                value={filters.houseType}
                onChange={handleChange}
              >
                <option value="">All</option>
                <option value="House">House</option>
                <option value="rent">Rent</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
              </select>
            </label>
          </div>
          <button className="filter-button" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Filter;
