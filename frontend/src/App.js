// client/src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import SellersList from "./components/SellersList";
import BuyersList from "./components/BuyersList";
import PropertiesList from "./components/PropertiesList";
import PropertyDetail from "./components/PropertyDetail";
import Portfolio from "./components/Portfolio";
import BottomToolbar from "./components/BottomToolbar";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <div className="container mt-4" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sellers" element={<SellersList />} />
            <Route path="/buyers" element={<BuyersList />} />
            <Route path="/properties" element={<PropertiesList />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
        <BottomToolbar />
      </Router>
    </>
  );
}

function HomePage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/api/property-listings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error fetching property listings:", error));
  }, []);

  return (
    <div className="row row-cols-2 g-2">
      {properties.map((property) => (
        <div className="col" key={property.id}>
          <Link to={`/properties/${property.id}`}>
            <div className="card">
              <img 
                src={property.thumbnail} 
                className="card-img-top" 
                alt={`Property ${property.id}`} 
                style={{ height: "200px", objectFit: "cover" }} 
              />
              <div className="card-body">
                <h5 className="card-title">{property.location}</h5>
                <p className="card-text">
                  <strong>Price/Token:</strong> {property.price_per_token_btc} BTC
                </p>
                <p className="card-text">
                  <strong>Annual Yield:</strong> {property.annual_yield}
                </p>
                <p className="card-text">
                  <strong>Tokens Sold:</strong> {property.percentage_sold}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default App;
