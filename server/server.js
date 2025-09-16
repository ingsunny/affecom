import express from "express";
import db from "./config/db.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- Get products by category ---
app.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;

    let query = "SELECT * FROM products";
    const values = [];

    if (category && category !== "all") {
      query += " WHERE category = ?";
      values.push(category);
    }

    const [rows] = await db.execute(query, values);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------------------------------------
// NEW: UPDATE a Product (Edit)
// --------------------------------------------------
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      name,
      brand,
      rating,
      review,
      price,
      originalPrice,
      imageLink,
      product_link,
    } = req.body;

    // Basic validation
    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, price, category" });
    }

    const query = `
      UPDATE products 
      SET 
        category = ?, name = ?, brand = ?, rating = ?, review = ?, 
        price = ?, originalPrice = ?, imageLink = ?, product_link = ?
      WHERE id = ?
    `;

    const values = [
      category,
      name,
      brand,
      rating,
      review,
      price,
      originalPrice,
      imageLink,
      product_link,
      id,
    ];

    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", id: id });
  } catch (err) {
    console.error(`PUT /api/products/${req.params.id} error:`, err);
    res.status(500).json({ error: "Server error updating product" });
  }
});

// --------------------------------------------------
// NEW: DELETE a Product
// --------------------------------------------------
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM products WHERE id = ?";

    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
    // Or you can send a 204 No Content response
    // res.status(204).send();
  } catch (err) {
    console.error(`DELETE /api/products/${req.params.id} error:`, err);
    res.status(500).json({ error: "Server error deleting product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
