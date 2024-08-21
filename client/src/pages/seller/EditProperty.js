// EditPropertyPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import SellerNavbar from "./SellerNav";
import "../style/editProperty.css";

function EditPropertyPage() {
  // Use the id prop
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  console.log(id);

  // Fetch property details when the component mounts
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/property/getPropertyById/${id}` // Use the id prop here
        ); // Replace with your API endpoint
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]); // Add id to dependency array

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/property/updateProperty/${id}`,
        property
      ); // Use the id prop here
      // Handle success (e.g., display a success message)
      alert("Property updated successfully");
      window.location.href = "/sellerHome";
    } catch (error) {
      console.error("Error updating property:", error);
      // Handle error (e.g., display an error message)
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    setProperty({ ...property, [event.target.name]: event.target.value });
  };

  // Render the edit form
  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SellerNavbar />
      <form onSubmit={handleSubmit}>
        <h2>Edit Property</h2>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={property.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={property.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="propertyType">Property Type:</label>
          <select
            id="propertyType"
            name="propertyType"
            value={property.propertyType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            {/* Add more property types as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            value={property.desc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={property.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPropertyPage;
