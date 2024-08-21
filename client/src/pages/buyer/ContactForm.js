import React, { useState } from "react";

function ContactForm({ propertyId, onSubmit }) {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for the popup

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function passed as a prop and pass the message and propertyId
    onSubmit({ propertyId, message });
    setMessage("");
    setShowPopup(true); // Show the popup after submitting
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="contact-form">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
        />
        <button type="submit">Send Message</button>
      </form>

      {/* Popup for confirmation */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Message sent successfully!</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
