"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW: State to manage which product is being edited
  const [editingProduct, setEditingProduct] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api/products";

  // ... (useEffect for fetching categories and products remains the same) ...
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((res) => {
        const uniqueCategories = [
          "all",
          ...new Set(res.data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch(() => setError("Could not load categories."));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url =
      selectedCategory === "all"
        ? API_BASE_URL
        : `${API_BASE_URL}?category=${encodeURIComponent(selectedCategory)}`;
    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch(() => setError("Could not load products."))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  // --- Modal and Action Handlers ---

  const handleEditProduct = (product) => setEditingProduct(product);
  const handleCloseModal = () => setEditingProduct(null);

  const handleSaveProduct = async (updatedProduct) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/${updatedProduct.id}`,
        updatedProduct
      );
      if (res.status !== 200) throw new Error("Failed to update product");

      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      handleCloseModal();
    } catch (err) {
      console.error("Update error:", err);
      alert("Error: Could not update the product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await axios.delete(`${API_BASE_URL}/${productId}`);
      if (res.status !== 200) throw new Error("Deletion failed");

      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Deletion error:", err);
      alert("Error: Could not delete the product.");
    }
  };

  return (
    <>
      {/* Conditionally render the modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseModal}
        />
      )}

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {/* ... (header and category selector JSX remains the same) ... */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Product Management
            </h1>
            <p className="text-gray-500 mt-1">
              Browse, edit, or delete products from your catalog.
            </p>
          </header>
          <div className="mb-8">
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full max-w-xs block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct} // Pass the handler
                onDelete={handleDeleteProduct} // Pass the handler
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl ...">
      {/* ... (image and product info) ... */}
      <img
        src={product.imageLink}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        {/* ... */}
        <div className="mt-auto">
          {/* ... */}
          <div className="flex justify-between items-center space-x-2 border-t pt-3">
            <button
              // CHANGE HERE: Pass the whole product object
              onClick={() => onEdit(product)}
              className="w-full text-center bg-blue-100 ..."
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="w-full text-center bg-red-100 ..."
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditProductModal({ product, onSave, onClose }) {
  // Initialize form state with the product data passed in props
  const [formData, setFormData] = useState(product);

  // Update form data if the product prop changes
  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Handle numbers for price, rating, etc.
    const finalValue = type === "number" ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated data back to the parent
  };

  if (!product) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form Fields */}
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
            <InputField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <InputField
              label="Price ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <InputField
              label="Original Price ($)"
              name="originalPrice"
              type="number"
              value={formData.originalPrice}
              onChange={handleChange}
            />
            <InputField
              label="Rating"
              name="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
            />
            <InputField
              label="Reviews"
              name="review"
              type="number"
              value={formData.review}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <InputField
                label="Image URL"
                name="imageLink"
                value={formData.imageLink}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Product URL"
                name="product_link"
                value={formData.product_link}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper component for form inputs to reduce repetition
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);
