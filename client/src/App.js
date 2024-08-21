// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./pages/register.js";
import LoginPage from "./pages/Login.js";
import SellerHomePage from "./pages/seller/SellerHomePage.js"; // Corrected import
import AddProperty from "./pages/seller/AddProperty.js";
import SellerNavbar from "./pages/seller/SellerNav.js"; // Corrected import
import EditPropertyPage from "./pages/seller/EditProperty.js";
import BuyerHomePage from "./pages/buyer/BuyerHomePage.js";
import BuyerMessages from "./pages/buyer/BuyerMessage.js";
import PropertyDetails from "./pages/buyer/PropertyDetail.js";
import UserProfile from "./pages/seller/UserProfile.js";
import BuyerProfile from "./pages/buyer/BuyerProfile.js";
import SellerMessage from "./pages/seller/Sellermessage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addProperty" element={<AddProperty />} />
        <Route path="/editProperty/:id" element={<EditPropertyPage />} />
        <Route path="/sellerHome" element={<SellerHomePage />} />
        <Route path="/buyerHome" element={<BuyerHomePage />} />
        <Route path="/messages" element={<BuyerMessages />} />
        <Route path="/sellerMessages" element={<SellerMessage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/seller" element={<SellerHomePage />} />
        <Route path="/seller/profile" element={<UserProfile />} />
        <Route path="/buyer/profile" element={<BuyerProfile />} />
        <Route
          path="/propertyDetail/:propertyId"
          element={<PropertyDetails />}
        />
        {/* Corrected component name */}
      </Routes>
    </Router>
  );
}

export default App;
