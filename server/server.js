import express from "express";
import db from "./config/db.js"; // Assuming this is your database connection file
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper function to handle database queries and server errors
const executeQuery = async (query, values, res) => {
  try {
    const [rows] = await db.execute(query, values);
    // Renaming columns to client-friendly camelCase or stripping the 'p.' prefix
    const formattedRows = rows.map((row) => ({
      id: row.id,
      category: row.category,
      name: row.name,
      brand: row.brand,
      rating: row.rating,
      review: row.review,
      price: row.price,
      originalPrice: row.originalPrice,
      imageLink: row.imageLink,
      product_link: row.product_link,
    }));
    res.json(formattedRows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Server error during database query." });
  }
};

// --- 1. GET all products (or by category/brand filter via query params) ---
// Your original route, slightly modified to handle 'all_products' logic.
app.get("/api/all_products", async (req, res) => {
  // You can still use 'category' as a filter on this endpoint
  const { category } = req.query;

  let query = "SELECT * FROM products";
  const values = [];

  if (category && category !== "all") {
    query += " WHERE category = ?";
    values.push(category);
  }

  await executeQuery(query, values, res);
});

// --- 2. GET products by specific brand ---
// Example: GET /api/products/Amazon
app.get("/api/products/:brand", async (req, res) => {
  const brand = decodeURIComponent(req.params.brand);

  if (!brand) {
    return res.status(400).json({ error: "Brand name is required." });
  }

  // Use LIKE for a more flexible search, or '=' for an exact match.
  // We'll use '=' for a direct brand match here.
  const query = "SELECT * FROM products WHERE brand = ?";
  const values = [brand];

  await executeQuery(query, values, res);
});

// --- Your original route (retained and simplified) ---
// Handles products with an optional category filter. Kept for backwards compatibility
// with your initial requirement. You can consider removing it if /api/all_products
// is sufficient.
app.get("/api/products", async (req, res) => {
  const { category } = req.query;

  let query = "SELECT * FROM products";
  const values = [];

  if (category && category !== "all") {
    query += " WHERE category = ?";
    values.push(category);
  }

  await executeQuery(query, values, res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Endpoints available:`);
  console.log(`- http://localhost:${PORT}/api/all_products`);
  console.log(
    `- http://localhost:${PORT}/api/all_products?category=Electronics`
  );
  console.log(`- http://localhost:${PORT}/api/products/Amazon`);
  console.log(`- http://localhost:${PORT}/api/products/Etsy`);
});
