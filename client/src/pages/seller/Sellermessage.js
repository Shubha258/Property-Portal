import React, { useState, useEffect } from "react";
import "../style/buyerMessage.css"; // Import your CSS file
import axios from "axios";
import { useCookies } from "react-cookie";
import BuyerNavbar from "./SellerNav.js";

function SellerMessage() {
  const [showPopup, setShowPopup] = useState(false);
  const [msg, setMsg] = useState(""); // Initialize msg as an empty string
  const [messages, setMessages] = useState([]);
  const [sellerNames, setSellerNames] = useState({}); // Store seller names by ID
  const [currentMessage, setCurrentMessage] = useState(null); // Store the message being replied to
  const [cookies] = useCookies(["user"]);
  const userData = cookies.user ? cookies.user : null;
  const sellerId = userData ? userData._id : null;

  const handleReply = async (e) => {
    // e.preventDefault(); // Prevent form submission from refreshing the page
 
    const property_id = currentMessage.property_id;

    // Construct the request body
    const requestBody = {
      seller_id: sellerId,
      message: msg, // Use the msg state for the message content
      buyer_id: currentMessage.buyer_id,
      property_id, // Include sellerId in the request body
      status: 1,
    };

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
      if (response.ok) {
        alert("message sent successfully");
        setMsg(""); // Clear the message input after sending
        setShowPopup(false); // Close the popup
        // Fetch updated messages after sending a reply
        handleReply();
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleMessage = (message) => {
    setShowPopup(true);
    setCurrentMessage(message); // Store the message being replied to
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/communication/getMessage`,
          {
            params: { seller_id: sellerId },
          }
        );
        setMessages(response.data);
        // Fetch seller names for each message
        const buyerIds = response.data.map((message) => message.seller_id);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // console.log(messages.buyer_id)

    fetchMessages();
  }, []);

//   console.log(messages[0].buyer_id.name);
  return (
    <div>
      <BuyerNavbar />

      <div className="message-board">
        <h1>Message Board</h1>
        <div className="message-list">
          <table>
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Reply</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index}>
                  <td>{messages[index].buyer_id.name}</td>
                  <td>{messages[index].seller_id.name}</td>
                  <td>{message.message}</td>
                  <td>{message.createdAt}</td>
                  <td>
                    {message.status === true ? (
                      <span className="sent">Sent</span>
                    ) : (
                      <span className="received">Received</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleMessage(message)}>
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && (
        <>
          <div
            className="popup-overlay"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="popup">
            <div className="popup-content">
              <form onSubmit={handleReply}>
                <label htmlFor="message">Message:</label>
                <textarea
                  name="message"
                  id="message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
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

export default SellerMessage;
