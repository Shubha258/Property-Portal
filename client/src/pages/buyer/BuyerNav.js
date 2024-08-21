import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../style/navBar.css";

const BuyerNavbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["user"]); // Get and set cookies

  const handleLogout = () => {
    // Remove the 'user' cookie
    setCookies("user", null, { path: "/" });

    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/buyerhome">
          Buyer Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/messages">
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/buyer/profile">
                User Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={handleLogout} to="/">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BuyerNavbar;
