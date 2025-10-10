"use client";

import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Grid, List } from "lucide-react";
import Image from "next/image";
import { useData } from "@/DataContext";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { useParams } from "next/navigation";
import products from "@/data/products";

// --- START: Main Component ---
// Must NOT be async when using "use client" and client-side hooks like useState/useEffect
export default function BrandPage() {
  // 1. Safely extract the brand name directly from params
  // Next.js will currently handle the decoding and synchronous access here.
  const params = useParams();
  const brandName = params.name;

  useEffect(() => {
    fetchProductsByBrand(brandName);
  }, []);

  // 2. Use the dedicated brand-fetching logic from the DataContext
  const { fetchProductsByBrand, brandProducts, brandLoading, brandError } =
    useData(); // We trust DataContext to manage setting brandProducts

  const [viewMode, setViewMode] = useState("grid");

  const ProductCard = ({ product, isListView = false }) => (
    <>
      <Card
        className={`hover:shadow-lg transition-shadow group p-3 ${
          isListView ? "flex" : ""
        }`}
        onClick={() => window.open(product.product_link)}
      >
        <CardContent
          className={`p-0 h-full  ${isListView ? "flex w-full" : ""}`}
        >
          <div
            className={`relative bg-white ${
              isListView ? "w-48 flex-shrink-0" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                isListView ? "h-full" : "w-full h-58"
              } rounded-t-lg ${
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
                className={`font-semibold mb-2 line-clamp-2 h-11 ${
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

              {/* <div className="flex items-center gap-2 mb-3">
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
                </div> */}
            </div>
            <Button
              className="w-full mt-auto"
              size={isListView ? "default" : "sm"}
            >
              View Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
  // --- Render Logic ---

  // Handle Loading State
  if (brandLoading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          {decodeURIComponent(brandName)} Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Handle Error State
  if (brandError) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold mb-4">
          Error Loading {decodeURIComponent(brandName)}
        </h1>
        <p className="text-red-500">{brandError}</p>
        <p className="text-muted-foreground mt-4">
          Please check your network or server connection.
        </p>
      </div>
    );
  }

  // Handle No Products Found
  if (brandProducts.length === 0 && !brandLoading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold mb-4">
          No Products Found for {decodeURIComponent(brandName)}
        </h1>
        <p className="text-lg text-muted-foreground">
          It looks like we couldn't find any items for this brand right now.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold capitalize">
            {decodeURIComponent(brandName)} Affiliate Products
          </h1>
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Count */}
        <p className="text-muted-foreground mb-8">
          Showing {brandProducts.length} items from{" "}
          {decodeURIComponent(brandName)}.
        </p>

        {/* Products Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-6"
          }
        >
          {brandProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isListView={viewMode === "list"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
