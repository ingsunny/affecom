"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Define the shape of the context value for better clarity (optional but good practice)
const DataContext = createContext({
  // Initial state for all products/categories
  products: [],
  categories: [],
  loading: true,
  error: null,

  // New function for brand-specific fetching
  fetchProductsByBrand: async (brandName) => [],
  // New state for brand-specific products
  brandProducts: [],
  brandLoading: false,
  brandError: null,
});

export const DataProvider = ({ children }) => {
  // Global States (for the main /api/all_products route)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Brand-Specific States (for the /api/products/:brand route)
  const [brandProducts, setBrandProducts] = useState([]);
  const [brandLoading, setBrandLoading] = useState(false);
  const [brandError, setBrandError] = useState(null);

  // const API_BASE_URL = "http://localhost:5000/api";
    const API_BASE_URL = "https://api.easyshopprice.com/api";

  // --- Initial Fetch: All Products and Categories ---
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Using the new /api/all_products endpoint
        const res = await axios.get(`${API_BASE_URL}/products`);
        setProducts(res.data);

        // Generate unique categories
        const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching all products data:", err);
        setError("Could not load initial products or categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // --- New Function: Fetch Products by Brand ---
  const fetchProductsByBrand = async (brandName) => {
    setBrandLoading(true);
    setBrandError(null);
    setBrandProducts([]); // Clear previous brand data

    // Encode the brand name to handle spaces (e.g., "The Home Depot")
    const encodedBrand = encodeURIComponent(brandName);
    const brandUrl = `${API_BASE_URL}/products/${encodedBrand}`;

    try {
      const res = await axios.get(brandUrl);
      setBrandProducts(res.data);
      return res.data; // Return data for immediate use in the calling component
    } catch (err) {
      console.error(`Error fetching products for brand: ${brandName}`, err);
      setBrandError(`Failed to load products for ${brandName}.`);
      return [];
    } finally {
      setBrandLoading(false);
    }
  };

  const contextValue = {
    // Global data
    products,
    categories,
    loading,
    error,

    // Brand-specific data and function
    fetchProductsByBrand,
    brandProducts,
    brandLoading,
    brandError,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
