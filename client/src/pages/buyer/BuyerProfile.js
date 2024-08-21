import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/userProfile.css";
import BuyerNavbar from "./BuyerNav.js";

function BuyerProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));
    if (userCookie) {
      const decodedData = JSON.parse(
        decodeURIComponent(userCookie.split("=")[1])
      );
      setUserData(decodedData);
    }
  }, []);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        ` http://localhost:8000/api/auth/updateUser/${userData._id}`,
        userData
      );
      console.log(response.data);
      setIsPopupOpen(false); // Close the popup on success
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <BuyerNavbar />
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Username:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
        </div>
        <button className="edit-button" onClick={handleEditClick}>
          Edit Profile
        </button>

        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <h2>Edit Profile</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Username:</label>{" "}
                  {/* Use 'name' here */}
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="button"
                  className="save-button"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="close-button"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyerProfile;
