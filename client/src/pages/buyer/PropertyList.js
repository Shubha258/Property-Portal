import React, { useState } from "react";
import "../style/propertyList.css";
import { useNavigate } from "react-router-dom"; 
import { useCookies } from "react-cookie";

function PropertyList({ properties }) {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [cookies] = useCookies(["user"]);
  const userData = cookies.user ? cookies.user : null;
  const userId = userData ? userData._id : null;
  const navigate = useNavigate();

  const handleContact = async (propertyId) => {
    setSelectedPropertyId(propertyId);

    try {
      const response = await fetch(
        `http://localhost:8000/api/listing/getListingByPropertyId/${propertyId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSellerId(data.sellerId);
      } else {
        console.error("Error fetching Id:", response.status);
      }
    } catch (error) {
      console.error("Error fetching sellerId:", error);
    }

    setShowPopup(true);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    const buyer_id = userId;
    const property_id = selectedPropertyId;

    const requestBody = {
      buyer_id,
      message,
      seller_id: sellerId,
      property_id,
    };

    const PostMessage = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/communication/createMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        if (response.ok) alert("Message sent successfully");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    PostMessage();
    setShowPopup(false);
    setMessage("");
  };

  const handleViewDetail = (propertyId) => {
    navigate(`/propertyDetail/${propertyId}`);
  };

  return (
    <div className="property-list">
      <h2>Properties</h2>
      <div className="property-cards">
        {properties?.map((property) => (
          <div key={property._id} className="property-card">
            <div className="property-card-image-container">
              {property.img && (
                <img
                  src={require(`../images/${property.img}`)}
                  alt={property.desc}
                  className="property-card-image"
                />
              )}
            </div>
            <div className="property-card-details">
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> ${property.price}</p>
            </div>
            <div className="property-card-actions">
              <button
                className="view-button"
                onClick={() => handleViewDetail(property._id)}
              >
                View Details
              </button>
              <button
                className="contact-button"
                onClick={() => handleContact(property._id)}
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <>
          <div
            className="popup-overlay"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="popup">
            <div className="popup-content">
              <form onSubmit={handleSendMessage}>
                <label htmlFor="message">Message:</label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PropertyList;
