// client/src/components/PropertyDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [buyers, setBuyers] = useState({});
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [selectedFraction, setSelectedFraction] = useState("");

  useEffect(() => {
    // Fetch property detail
    fetch(`/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error(err));

    // Fetch buyers
    fetch(`/api/buyers`)
      .then((res) => res.json())
      .then((data) => setBuyers(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!property) {
    return <div>Loading property...</div>;
  }

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!selectedBuyer || !selectedFraction) return;

    const payload = {
      buyer_id: Number(selectedBuyer),
      property_id: Number(id),
      fraction_percent: Number(selectedFraction),
    };

    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Purchase successful!");
        // Reload or navigate to updated page
        navigate(`/properties/${id}`);
        window.location.reload();
      } else {
        alert(data.error || "Purchase failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="card mb-4 shadow-sm">
        {/* Example property banner/hero image */}
        <img
          src="https://via.placeholder.com/900x250.png?text=Property+Detail"
          className="card-img-top"
          alt="Property banner"
        />
        <div className="card-body">
          <h3 className="card-title">Property #{id}</h3>
          <p className="card-text">
            <strong>Description:</strong> {property.description}
            <br />
            <strong>Price (USD):</strong> ${property.price_usd}
            <br />
            <strong>Fractions for Sale:</strong>{" "}
            {property.fractions_for_sale.join(", ")}
          </p>
        </div>
      </div>

      <h4>Ownership Records</h4>
      {property.ownership_records.length === 0 ? (
        <p>No ownership yet.</p>
      ) : (
        <table className="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th>Buyer ID</th>
              <th>Fraction (%)</th>
            </tr>
          </thead>
          <tbody>
            {property.ownership_records.map((record, idx) => (
              <tr key={idx}>
                <td>{record.buyer_id}</td>
                <td>{record.fraction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />
      <h4>Purchase Fraction</h4>
      {property.fractions_for_sale.length === 0 ? (
        <p>All fractions sold out!</p>
      ) : (
        <form onSubmit={handlePurchase} style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label className="form-label">Select Buyer</label>
            <select
              className="form-select"
              value={selectedBuyer}
              onChange={(e) => setSelectedBuyer(e.target.value)}
              required
            >
              <option value="">-- Choose Buyer --</option>
              {Object.keys(buyers).map((bId) => (
                <option key={bId} value={bId}>
                  Buyer {bId} - {buyers[bId].name} (BTC:{" "}
                  {buyers[bId].btc_balance})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Fraction (%)</label>
            <select
              className="form-select"
              value={selectedFraction}
              onChange={(e) => setSelectedFraction(e.target.value)}
              required
            >
              <option value="">-- Choose Fraction --</option>
              {property.fractions_for_sale.map((frac) => (
                <option key={frac} value={frac}>
                  {frac}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success">
            Buy Now
          </button>
        </form>
      )}
    </div>
  );
}

export default PropertyDetail;
