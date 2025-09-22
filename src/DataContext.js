"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext({
  products: [],
  categories: [],
  loading: true,
  error: null,
});

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api/products";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_BASE_URL);
        setProducts(res.data);

        const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Could not load products or categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
