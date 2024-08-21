import React, { useState } from "react";
import "./style/login.css"; // Import the CSS file
import Navbar from "./NavBar.js";
import { useCookies } from "react-cookie";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, Password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.existinguser);
        setCookie("user", JSON.stringify(data.existinguser), { path: "/" });

        // Successful login, redirect to the desired page
        if (data.existinguser.role === 1) window.location.href = "/sellerHome";
        else window.location.href = "/buyerHome";
        // Replace with your dashboard URL
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={Password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
