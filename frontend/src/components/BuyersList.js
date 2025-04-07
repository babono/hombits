// client/src/components/BuyersList.js
import React, { useEffect, useState } from "react";

function BuyersList() {
  const [buyers, setBuyers] = useState({});

  useEffect(() => {
    fetch("/api/buyers")
      .then((res) => res.json())
      .then((data) => setBuyers(data))
      .catch((err) => console.error(err));
  }, []);

  const renderRows = () => {
    return Object.keys(buyers).map((id) => {
      const buyer = buyers[id];
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{buyer.name}</td>
          <td>{buyer.btc_balance} BTC</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2>Buyers</h2>
      <p className="text-muted">
        We have {Object.keys(buyers).length} registered buyers in our system.
      </p>

      <table className="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th>Buyer ID</th>
            <th>Name</th>
            <th>BTC Balance</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      {/* Same basic pagination stub */}
      <nav aria-label="Buyer pagination">
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

export default BuyersList;
