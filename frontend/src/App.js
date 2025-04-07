// client/src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import SellersList from "./components/SellersList";
import BuyersList from "./components/BuyersList";
import PropertiesList from "./components/PropertiesList";
import PropertyDetail from "./components/PropertyDetail";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sellers" element={<SellersList />} />
          <Route path="/buyers" element={<BuyersList />} />
          <Route path="/properties" element={<PropertiesList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <h2>Hombits — Next Generation Real Estate Investing</h2>
        <p>
          Experience frictionless fractional ownership, transparent
          transactions, and quick liquidity.
        </p>
        <button className="btn hero-btn">Learn More</button>
      </div>

      {/* Additional homepage content, or just keep it simple */}
      <div>
        <h3>Welcome to Hombits!</h3>
        <p>
          A simple platform for fractional property investments. Use the
          navigation links above to browse sellers, buyers, and properties.
        </p>
      </div>
    </>
  );
}

export default App;
