import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/homePage.css";

const LandingPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/property/getAllProperty"
        );
        setProperties(response.data || []); // Ensure an empty array if no properties are returned
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Property Buyer and Seller Portal</h1>
      {loading && <p>Loading properties...</p>}
      {!loading && properties.length > 0 && (
        <div className="property-list">
          {properties.map((property) => (
            <div key={property._id} className="property-card">
              <h3>{property.name}</h3>
              <p>{property.description}</p>
              <p>
                <strong>Price:</strong> ${property.price}
              </p>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
            </div>
          ))}
        </div>
      )}
      {!loading && properties.length === 0 && <p>No properties found.</p>}
    </div>
  );
};

export default LandingPage;
