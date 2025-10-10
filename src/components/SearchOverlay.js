"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react"; // or your star icon
import Image from "next/image";
import { useData } from "@/DataContext";

export default function SearchOverlay({ viewMode = "grid" }) {
  const { products, loading, error } = useData();
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Run search only on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      const matches = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matches);
      setIsOpen(true);
    }
  };

  const ProductCard = ({ product, isListView = false }) => (
    <Card
      className={`hover:shadow-lg transition-shadow group p-3 ${
        isListView ? "flex" : ""
      }`}
      onClick={() => window.open(product.product_link, "_blank")}
    >
      <CardContent className={`p-0 ${isListView ? "flex w-full" : ""}`}>
        <div
          className={`relative bg-white ${
            isListView ? "w-48 flex-shrink-0" : ""
          }`}
        >
          <div
            className={`relative ${isListView ? "h-full" : "w-full h-48"} 
                        rounded-t-lg ${
                          isListView ? "rounded-l-lg rounded-tr-none" : ""
                        }`}
          >
            <img
              src={product.imageLink || "/placeholder.svg"}
              alt={product.name}
              className={`${
                isListView ? "h-48" : "h-full"
              } object-contain w-auto mx-auto group-hover:scale-105 transition-transform`}
            />
          </div>
          <Badge className="absolute top-2 left-2" variant="secondary">
            {product?.brand?.replace("Brand:", "")}
          </Badge>
        </div>

        <div
          className={`p-4 ${
            isListView ? "flex-1 flex flex-col justify-between" : ""
          }`}
        >
          <div>
            <h3
              className={`font-semibold mb-2 line-clamp-2 ${
                isListView ? "text-base" : "text-sm"
              }`}
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.review})
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`font-bold text-primary ${
                  isListView ? "text-xl" : "text-lg"
                }`}
              >
                ${product.price}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            </div>
          </div>
          <Button className="w-full" size={isListView ? "default" : "sm"}>
            View on Amazon
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative flex-1">
      {/* Search Input */}
      <div className="relative transition-all duration-700 border-none">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 text-sm focus-visible:ring-[0px] border-gray-300 shadow-none placeholder:text-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Overlay */}
      {isOpen && (
        <>
          {/* Blur background */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Search results modal */}
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-11/12 max-w-5xl z-50 p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[70vh]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            {/* Close button */}

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && filteredProducts.length === 0 && (
              <p className="text-center text-gray-500">No products found.</p>
            )}

            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isListView={viewMode === "list"}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
