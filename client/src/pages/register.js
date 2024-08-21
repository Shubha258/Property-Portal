import React, { useState } from "react";
import "./style/register.css";
import Navbar from "./NavBar.js";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [roles, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone, address, roles }),
      });

      if (response.ok) {
        // Handle successful registration
        // Redirect to login page or display a success message
        alert("User registration successful");
        window.location.href = "/login"; // Replace with your login URL
      } else {
        // Handle registration errors
        const errorData = await response.json();
        // Display error message to the user
        alert(errorData.message || "An error occurred. Please try again later.");
      }
    } catch (error) {
      // Handle network errors
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registrationForm">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={roles}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;