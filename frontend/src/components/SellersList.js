// client/src/components/SellersList.js
import React, { useEffect, useState } from "react";

function SellersList() {
  const [sellers, setSellers] = useState({});

  useEffect(() => {
    fetch("/api/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data))
      .catch((err) => console.error(err));
  }, []);

  const renderRows = () => {
    return Object.keys(sellers).map((id) => {
      const seller = sellers[id];
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{seller.name}</td>
          <td>{(seller.properties || []).join(", ")}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2>Sellers</h2>
      <p className="text-muted">
        Explore our list of {Object.keys(sellers).length} sellers.
      </p>

      <table className="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th>Seller ID</th>
            <th>Name</th>
            <th>Properties</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      {/* Simple pagination stub (not functional, but a placeholder for future) */}
      <nav aria-label="Seller pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a href="#!" className="page-link">
              Previous
            </a>
          </li>
          <li className="page-item active">
            <a href="#!" className="page-link">
              1
            </a>
          </li>
          <li className="page-item">
            <a href="#!" className="page-link">
              2
            </a>
          </li>
          <li className="page-item">
            <a href="#!" className="page-link">
              3
            </a>
          </li>
          <li className="page-item">
            <a href="#!" className="page-link">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SellersList;
