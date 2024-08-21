// PropertyDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyerNavbar from "./BuyerNav.js";
import "../style/propertyDetail.css";

function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  console.log(propertyId);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/property/getPropertyById/${propertyId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        } else {
          console.error("Error fetching property:", response.status);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  console.log(property);
  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BuyerNavbar />
      <div className="property-details">
        <img
          src={require(`../images/${property.img}`)}
          alt={property.desc}
          className="property-image"
        />
        <div className="property-info">
          <h2>{property.title}</h2>
          <p>Location: {property.location}</p>
          <p>Address: {property.address}</p>
          <p>Type: {property.propertyType}</p>
          <p>Price: {property.price}</p>
          <p>Description: {property.desc}</p>
          {/* Add a button to contact the seller */}
          {/* You can use the sellerId from the property object to send a message */}
          {/* <button className="contact-button">Contact Us</button> */}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
