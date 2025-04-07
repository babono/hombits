// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// ----------------------------------------------------------------
// Dummy In-Memory Data
// ----------------------------------------------------------------
let sellers = {
  1: { name: "Alice", properties: [101, 110] },
  2: { name: "Bob", properties: [102] },
  3: { name: "Charlie", properties: [103, 109] },
  4: { name: "Diana", properties: [104] },
  5: { name: "Ethan", properties: [105] },
  6: { name: "Fiona", properties: [106] },
  7: { name: "George", properties: [107, 112] },
  8: { name: "Helen", properties: [108] },
  9: { name: "Ian", properties: [111] },
  10: { name: "Jane", properties: [115] },
  11: { name: "Kevin", properties: [113] },
  12: { name: "Laura", properties: [114] },
  13: { name: "Martin", properties: [116] },
  14: { name: "Natalie", properties: [117] },
  15: { name: "Oliver", properties: [118] },
  16: { name: "Paula", properties: [119] },
  17: { name: "Quincy", properties: [120] },
  18: { name: "Rachel", properties: [] },
  19: { name: "Simon", properties: [] },
  20: { name: "Tina", properties: [] },
};

let buyers = {
  1: { name: "Uma", btc_balance: 1.2 },
  2: { name: "Victor", btc_balance: 3.7 },
  3: { name: "Wendy", btc_balance: 0.9 },
  4: { name: "Xavier", btc_balance: 2.2 },
  5: { name: "Yvonne", btc_balance: 4.1 },
  6: { name: "Zack", btc_balance: 1.9 },
  7: { name: "Aiden", btc_balance: 2.5 },
  8: { name: "Bella", btc_balance: 0.6 },
  9: { name: "Caleb", btc_balance: 5.0 },
  10: { name: "Daphne", btc_balance: 1.1 },
  11: { name: "Evelyn", btc_balance: 2.0 },
  12: { name: "Felix", btc_balance: 3.3 },
  13: { name: "Gina", btc_balance: 2.7 },
  14: { name: "Harvey", btc_balance: 1.5 },
  15: { name: "Irene", btc_balance: 4.0 },
  16: { name: "Jason", btc_balance: 1.75 },
  17: { name: "Kyla", btc_balance: 2.9 },
  18: { name: "Leon", btc_balance: 1.2 },
  19: { name: "Mia", btc_balance: 3.1 },
  20: { name: "Noah", btc_balance: 2.45 },
};

let properties = {
  101: {
    seller_id: 1,
    description: "Cozy Cabin in the Woods",
    price_usd: 50000.0,
    fractions_for_sale: [5, 10, 25],
    ownership_records: [],
    thumbnail: "/images/house/1.jpg",
  },
  102: {
    seller_id: 2,
    description: "Urban Loft in Metro City",
    price_usd: 100000.0,
    fractions_for_sale: [10, 20, 30],
    ownership_records: [],
    thumbnail: "/images/house/2.jpg",
  },
  103: {
    seller_id: 3,
    description: "Beachfront Condo",
    price_usd: 80000.0,
    fractions_for_sale: [5, 10, 15, 25],
    ownership_records: [],
    thumbnail: "/images/house/3.jpg",
  },
  104: {
    seller_id: 4,
    description: "Lakehouse Retreat",
    price_usd: 120000.0,
    fractions_for_sale: [10, 20, 40],
    ownership_records: [],
    thumbnail: "/images/house/4.jpg",
  },
  105: {
    seller_id: 5,
    description: "Suburban Family Home",
    price_usd: 90000.0,
    fractions_for_sale: [5, 10, 15],
    ownership_records: [],
    thumbnail: "/images/house/5.jpg",
  },
  106: {
    seller_id: 6,
    description: "Downtown Office Suite",
    price_usd: 75000.0,
    fractions_for_sale: [10, 25],
    ownership_records: [],
    thumbnail: "/images/house/6.jpg",
  },
  107: {
    seller_id: 7,
    description: "Historic Brownstone",
    price_usd: 140000.0,
    fractions_for_sale: [10, 20, 30, 40],
    ownership_records: [],
    thumbnail: "/images/house/7.jpg",
  },
  108: {
    seller_id: 8,
    description: "Mountain Chalet",
    price_usd: 60000.0,
    fractions_for_sale: [5, 10, 20],
    ownership_records: [],
    thumbnail: "/images/house/8.jpg",
  },
  109: {
    seller_id: 3,
    description: "Riverside Cottage",
    price_usd: 70000.0,
    fractions_for_sale: [5, 15],
    ownership_records: [],
    thumbnail: "/images/house/9.jpg",
  },
  110: {
    seller_id: 1,
    description: "Luxury Penthouse",
    price_usd: 200000.0,
    fractions_for_sale: [10, 20, 25],
    ownership_records: [],
    thumbnail: "/images/house/10.jpg",
  },
};

const DUMMY_BTC_TO_USD_RATE = 20000;
function usdToBtc(usd) {
  return Number((usd / DUMMY_BTC_TO_USD_RATE).toFixed(4));
}

// ----------------------------------------------------------------
// API Routes
// ----------------------------------------------------------------
app.get("/api/sellers", (req, res) => {
  res.json(sellers);
});

app.get("/api/buyers", (req, res) => {
  res.json(buyers);
});

app.get("/api/properties", (req, res) => {
  res.json(properties);
});

app.get("/api/properties/:id", (req, res) => {
  const propertyId = Number(req.params.id);
  const property = properties[propertyId];
  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }
  res.json(property);
});

app.post("/api/purchase", (req, res) => {
  const { buyer_id, property_id, fraction_percent } = req.body;
  if (!buyers[buyer_id]) {
    return res.status(404).json({ error: "Buyer not found" });
  }
  if (!properties[property_id]) {
    return res.status(404).json({ error: "Property not found" });
  }
  const property = properties[property_id];
  if (!property.fractions_for_sale.includes(fraction_percent)) {
    return res.status(400).json({ error: "Fraction not available" });
  }

  const cost_usd = (fraction_percent / 100) * property.price_usd;
  const cost_btc = usdToBtc(cost_usd);

  if (buyers[buyer_id].btc_balance < cost_btc) {
    return res.status(400).json({ error: "Insufficient BTC balance" });
  }

  // Deduct from buyer
  buyers[buyer_id].btc_balance -= cost_btc;

  // Record ownership
  property.ownership_records.push({ buyer_id, fraction: fraction_percent });

  // Remove fraction from the for_sale list
  const idx = property.fractions_for_sale.indexOf(fraction_percent);
  property.fractions_for_sale.splice(idx, 1);

  // Return success
  return res.json({
    message: "Purchase successful",
    cost_usd,
    cost_btc,
    new_balance_buyer: buyers[buyer_id].btc_balance,
  });
});

app.get("/api/property-listings", async (req, res) => {
  try {
    const propertyListings = await Promise.all(
      Object.keys(properties).map(async (id) => {
        const property = properties[id];
        const tokensSold = property.ownership_records.reduce(
          (sum, record) => sum + record.fraction,
          0
        );

        return {
          id,
          thumbnail: property.thumbnail,
          location: `Location ${id}`, // Dummy location
          price_per_token_btc: usdToBtc(property.price_usd / 100),
          annual_yield: `${(Math.random() * 10 + 5).toFixed(2)}%`, // Random yield between 5% and 15%
          percentage_sold: `${tokensSold}%`,
        };
      })
    );

    res.json(propertyListings);
  } catch (error) {
    console.error("Error fetching property listings:", error);
    res.status(500).json({ error: "Failed to fetch property listings" });
  }
});

// ----------------------------------------------------------------
// Serve React's Build Folder
// ----------------------------------------------------------------
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route to serve React's index.html for non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
