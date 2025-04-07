// client/src/components/PropertiesList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PropertiesList() {
  const [properties, setProperties] = useState({});

  useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);

  const renderRows = () => {
    return Object.keys(properties).map((id) => {
      const prop = properties[id];
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{prop.description}</td>
          <td>${prop.price_usd}</td>
          <td>{prop.fractions_for_sale.join(", ")}</td>
          <td>
            <Link to={`/properties/${id}`} className="btn btn-primary btn-sm">
              View
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2>Properties</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Price (USD)</th>
            <th>Fractions For Sale (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}

export default PropertiesList;
