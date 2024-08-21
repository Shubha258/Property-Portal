import React from "react";

function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        marginTop: "10px",
        bottom: 0,
        width: "100%",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      <p style={{ fontSize: "1.2em", fontWeight: "bold", color: "#333" }}>
        Created by Shubham Shukla &copy; 2024. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
