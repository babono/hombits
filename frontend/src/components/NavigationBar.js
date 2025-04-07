// client/src/components/NavigationBar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-homebits.svg"; // Adjust the path if necessary

function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="container-fluid" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link to="/" className="navbar-brand">
          <img 
            src={logo} 
            alt="Hombits Logo" 
            style={{ height: "40px" }} // Adjust the height as needed
          />
        </Link>
      </div>
      <div className="navbar-border" />
    </nav>
  );
}

export default NavigationBar;
