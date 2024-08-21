import React from "react";
import "../style/sellerPropertyList.css";
import { Link } from "react-router-dom";
import axios from "axios";

function PropertyList({ properties }) {
  console.log(properties);

  const handleDelete = async (propertyId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/property/deleteProperty/${propertyId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="property-card-list">
      <h2>My Property</h2>
      <ul className="property-card-grid">
        {properties?.map((property) => (
          <li key={property._id} className="property-card-item">
            <div className="property-card-details">
              <div className="property-card-image-container">
                {property.img && (
                  <img
                    src={require(`../images/${property.img}`)}
                    alt={property.desc}
                    className="property-card-image"
                  />
                )}
              </div>
              <div className="property-card-info">
                <h3>{property.title}</h3>
                <p>Location: {property.location}</p>
                <p>Address: {property.address}</p>
                <p>Type: {property.propertyType}</p>
                <p>Price: ₹{property.price}</p>
                <p>Description: {property.desc}</p>
              </div>
              <div className="property-card-actions">
                <Link
                  to={`/editProperty/${property._id}`}
                  className="property-card-edit-button"
                >
                  Edit
                </Link>{" "}
                <button
                  className="property-card-delete-button"
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
