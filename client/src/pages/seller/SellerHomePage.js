import SellerNavbar from "./SellerNav.js";
import React, { useState, useEffect } from "react";
import PropertyList from "./PropertyList.js";
import Filter from "./Filter.js";
import { useCookies } from "react-cookie";
import Footer from "../Footer.js";
// import  "../style/homePage.css";

const SellerHomePage = () => {
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
    // Fetch properties associated with the seller.
    const fetchProperties = async () => {
      try {
        // 1. Fetch property IDs associated with the user
        const response = await fetch(
          `http://localhost:8000/api/listing/getListingById/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property IDs");
        }
        const propertyIds = await response.json();

        // If no propertyIds found, set properties to an empty array
        if (propertyIds.length === 0) {
          setProperties([]);
          return;
        }

        // 2. Fetch property details for each propertyId
        const propertyDetails = await Promise.all(
          propertyIds.map(async (propertyId) => {
            try {
              const propertyResponse = await fetch(
                `http://localhost:8000/api/property/getPropertyById/${propertyId}`
              );
              if (!propertyResponse.ok) {
                // If propertyId is not found in the property table, skip it
                console.error(`Property with ID ${propertyId} not found`);
                return null;
              }
              return await propertyResponse.json();
            } catch (error) {
              console.error(
                `Error fetching property details for ID ${propertyId}:`,
                error
              );
              return null;
            }
          })
        );

        // Filter out null values (properties that were not found)
        const validProperties = propertyDetails.filter(
          (property) => property !== null
        );

        // Set the properties state
        setProperties(validProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [userId]);

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
      <SellerNavbar />
      <div className="App">
        <Filter
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
        />
        {/* Only render PropertyList if properties array is not empty */}
        {properties.length > 0 && <PropertyList properties={properties} />}
      </div>
      <Footer/>
    </div>
  );
};

export default SellerHomePage;
