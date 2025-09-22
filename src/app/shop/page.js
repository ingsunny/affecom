"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Filter, Grid, List } from "lucide-react";
import Image from "next/image";
import { useData } from "@/DataContext";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";

export default function ShopPage() {
  const { products: allProducts, categories, loading, error } = useData();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState("grid");

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      return matchesCategory && matchesPrice && matchesRating;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.review - a.review);
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    return filtered;
  }, [allProducts, selectedCategory, priceRange, minRating, sortBy]);

  const ProductCard = ({ product, isListView = false }) => (
    <>
      <Card
        className={`hover:shadow-lg transition-shadow group p-3 ${
          isListView ? "flex" : ""
        }`}
        onClick={() => window.open(product.product_link)}
      >
        <CardContent className={`p-0 ${isListView ? "flex w-full" : ""}`}>
          <div
            className={`relative bg-white ${
              isListView ? "w-48 flex-shrink-0" : ""
            }`}
          >
            <div
              className={`relative ${
                isListView ? "h-full" : "w-full h-48"
              } rounded-t-lg ${
                isListView ? "rounded-l-lg rounded-tr-none" : ""
              }`}
            >
              <Image
                src={product.imageLink || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform"
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
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={800}
                  min={0}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Minimum Rating
                </label>
                <Select
                  value={minRating.toString()}
                  onValueChange={(value) => setMinRating(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All Ratings</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 1000]);
                  setMinRating(0);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Header with Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Shop All Products</h1>
                <p className="text-muted-foreground">
                  Showing {filteredAndSortedProducts.length} of{" "}
                  {allProducts.length} products
                </p>
              </div>

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

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {loading
                ? // show skeletons
                  Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton
                      key={i}
                      isListView={viewMode === "list"}
                    />
                  ))
                : filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isListView={viewMode === "list"}
                    />
                  ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 1000]);
                    setMinRating(0);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
