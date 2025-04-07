// client/src/components/NavigationBar.js
import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Brand name changed here */}
        <Link to="/" className="navbar-brand">
          Hombits
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/sellers" className="nav-link">
                Sellers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/buyers" className="nav-link">
                Buyers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/properties" className="nav-link">
                Properties
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
