import React, { useState } from "react";
import axios from "axios";
import "../style/addProperty.css";
import { useCookies } from "react-cookie";
import SellerNavbar from "./SellerNav";

const AddProperty = () => {
  const [cookies] = useCookies(["user"]);
  const userData = cookies.user ? cookies.user : null;
  const userId = userData ? userData._id : null;

  // console.log("User ID:", userId);

  const [formData, setFormData] = useState({
    address: "",
    propertyType: "",
    img: null,
    desc: "",
    price: "",
    location: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "img") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      // First, register the property
      const propertyResponse = await axios.post(
        "http://localhost:8000/api/property/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const propertyId = propertyResponse.data.property._id; // Assuming the response contains the property ID

      // Then, create a listing for the property
      const listingData = {
        sellerId: userId,
        propertyId: propertyId,
      };

      console.log(propertyResponse.data.property._id);
      const listingResponse = await axios.post(
        "http://localhost:8000/api/listing/createListing",
        listingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Listing created successfully:", listingResponse.data);
      alert("Property and listing added successfully");
      window.location.href = "/sellerHome";
    } catch (error) {
      console.error("Error adding property or creating listing:", error);
      alert("Failed to add property or create listing");
    }
  };

  return (
    <div>
      <SellerNavbar />
      <div className="add-property-container">
        <h2>Add Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="propertyType">Property Type:</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="House">Rent</option>
              <option value="Apartment">Land</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              name="img"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description:</label>
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
