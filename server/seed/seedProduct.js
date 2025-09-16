import db from "../config/db.js";
import products from "../../src/data/products.js";
db;

const safeFloat = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
};

const safeInt = (val) => {
  const num = parseInt((val || "").toString().replace(/,/g, ""), 10);
  return isNaN(num) ? null : num;
};

try {
  const sql = `
    INSERT INTO products 
    (id, category, name, brand, rating, review, price, originalPrice, imageLink, product_link) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  products.forEach((p) => {
    db.query(
      sql,
      [
        p.id,
        p.category,
        p.name,
        p.brand,
        safeFloat(p.rating),
        safeInt(p.review),
        safeFloat(p.price),
        safeFloat(p.originalPrice),
        p.imageLink,
        p.product_link,
      ],
      (err) => {
        if (err) console.error("Insert error:", err);
      }
    );
  });

  console.log("Products inserted!");
} catch (err) {
  console.log(err);
}
