"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  Smartphone,
  Shirt,
  Dumbbell,
  Dog,
  Scissors,
  Cat,
  Utensils,
  Monitor,
  Baby,
  Lightbulb,
  FolderOpen,
  Sparkles,
  Pill,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Dog Food & Treats",
    icon: Dog,
    color: "text-amber-500",
    href: "/category/dog-food-treats",
  },
  {
    name: "Tough Chewer Dog Toys",
    icon: Dog,
    color: "text-blue-500",
    href: "/category/tough-chewer-toys",
  },
  {
    name: "Pet Grooming Supplies",
    icon: Scissors,
    color: "text-pink-500",
    href: "/category/pet-grooming",
  },
  {
    name: "Interactive Cat Toys",
    icon: Cat,
    color: "text-purple-500",
    href: "/category/cat-toys",
  },
  {
    name: "Electronics",
    icon: Smartphone,
    color: "text-indigo-500",
    href: "/category/electronics",
  },
  {
    name: "Men's Clothing",
    icon: Shirt,
    color: "text-blue-600",
    href: "/category/mens-clothing",
  },
  {
    name: "Women's Clothing",
    icon: Shirt,
    color: "text-pink-600",
    href: "/category/womens-clothing",
  },
  {
    name: "Kitchen & Dining",
    icon: Utensils,
    color: "text-orange-500",
    href: "/category/kitchen-dining",
  },
  {
    name: "Home Office Essentials",
    icon: Monitor,
    color: "text-gray-600",
    href: "/category/home-office",
  },
  {
    name: "Skincare & Beauty",
    icon: Sparkles,
    color: "text-rose-500",
    href: "/category/skincare-beauty",
  },
  {
    name: "Vitamins & Supplements",
    icon: Pill,
    color: "text-green-500",
    href: "/category/vitamins-supplements",
  },
  {
    name: "Baby Essentials",
    icon: Baby,
    color: "text-yellow-500",
    href: "/category/baby-essentials",
  },
  {
    name: "Smart Home Devices",
    icon: Lightbulb,
    color: "text-cyan-500",
    href: "/category/smart-home",
  },
  {
    name: "Home Organization",
    icon: FolderOpen,
    color: "text-teal-500",
    href: "/category/home-organization",
  },
  {
    name: "At-Home Fitness Equipment",
    icon: Dumbbell,
    color: "text-red-500",
    href: "/category/fitness-equipment",
  },
];

export default function AnimatedSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-[#f2f2ec] text-black hover:text-black"
        >
          <div className="relative">
            <div className={`w-5 h-0.5 bg-current mb-1 `} />
            <div className={`w-5 h-0.5 bg-current mb-1`} />
            <div className={`w-5 h-0.5 bg-current`} />
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-80 p-0 border-r-0 shadow-2xl bg-gradient-to-br from-primary to-secondary"
      >
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full transition-all duration-1000 ${
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionDelay: "0ms" }}
          />
          <div
            className={`absolute top-1/2 -left-10 w-24 h-24 bg-white/5 rounded-full transition-all duration-1000 ${
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
          <div
            className={`absolute bottom-20 -right-10 w-32 h-32 bg-white/5 rounded-full transition-all duration-1000 ${
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Header with Logo */}
          <div className="p-6 border-b border-white/20">
            <div
              className={`flex items-center space-x-3 transition-all duration-700 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src="/easyshop.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">EasyShop</h2>
                <p className="text-white/70 text-sm">Find Best Deals</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6">
            <div
              className={`relative transition-all duration-700 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-white/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Categories List */}
          <div className="flex-1 px-6 pb-6 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent scrollbar-thumb-rounded">
            <h3
              className={`text-white/90 font-semibold mb-4 transition-all duration-700 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-5 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              Categories
            </h3>

            <div className="space-y-2">
              {filteredCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer transition-all duration-500 hover:translate-x-2 ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${700 + index * 50}ms` }}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        className={`w-4 h-4 ${category.color} group-hover:text-white transition-colors duration-300`}
                      />
                    </div>
                    <span className="text-white/90 font-medium group-hover:text-white transition-colors duration-300 text-sm">
                      {category.name}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/60">No categories found</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/20">
            <Link href="/categories">
              <Button
                variant="secondary"
                className={`w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-700 ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: `${
                    700 + filteredCategories.length * 50 + 200
                  }ms`,
                }}
                onClick={() => setIsOpen(false)}
              >
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
