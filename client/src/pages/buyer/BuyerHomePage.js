import React, { useState, useEffect } from "react";
import PropertyList from "./PropertyList.js";
import Filter from "./Filter.js";
import { useCookies } from "react-cookie";
import BuyerNavbar from "./BuyerNav.js";

const BuyerHomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 100000000000,
  });

  const [cookies] = useCookies(["user"]);
  const userData = cookies.user ? cookies.user : null;
  const userId = userData ? userData._id : null;

  useEffect(() => {
    // Fetch all properties
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/property/getAllProperty"
        );
        const allProperties = await response.json();
        setProperties(allProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const applyFilters = () => {
    let filteredProperties = properties.filter((property) => {
      console.log(filters);
      return (
        property.location.includes(filters.location) &&
        property.propertyType === filters.houseType && // Use strict equality for single selection
        property.price >= filters.minPrice &&
        property.price <= filters.maxPrice
      );
    });
    setProperties(filteredProperties);
  };

  return (
    <div>
      <BuyerNavbar />
      <div className="App">
        <Filter
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
        />
        <PropertyList properties={properties} />
      </div>
    </div>
  );
};

export default BuyerHomePage;
