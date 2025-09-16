"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, Truck, Shield, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import categories from "@/data/categories";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen ">
      {/* Hero section  */}
      <section className="relative h-[200px]">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/hero3.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Black overlay with opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        <div className="relative max-w-[85vw] mx-auto flex items-center justify-between h-full px-4 pt-4">
          <div className="h-fit">
            <h1 className="text-4xl md:text-4xl font-bold text-white mb-2 text-balance">
              Discover Amazing Products at <br /> Unbeatable Prices
            </h1>
            <p className="text-lg text-white mb-8 max-w-2xl mx- text-pretty">
              Find the best deals on top-rated products from trusted brands.
              Compare prices and read real reviews.
            </p>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <Button
              onClick={() => router.push("/shop")}
              size="lg"
              className="text-lg px-8"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button
              onClick={() => router.push("#categories")}
              size="lg"
              className="hover:bg-[#f2f2ec] text-lg px-8 text-black/90 bg-white"
            >
              View Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="relative bg-primary text-primary-foreground py-4">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-33 left-30 w-40 h-40 bg-white/10 rounded-full transition-all duration-1000 `}
            style={{ transitionDelay: "0ms" }}
          />
          <div
            className={`absolute top-1/2 -left-0 w-24 h-24 bg-white/5 rounded-full transition-all duration-1000 `}
            style={{ transitionDelay: "200ms" }}
          />
          <div
            className={`absolute top-4 -right-0 w-32 h-32 bg-white/5 rounded-full transition-all duration-1000 `}
            style={{ transitionDelay: "400ms" }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Free Shipping on Orders $50+
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              30-Day Money Back Guarantee
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              24/7 Customer Support
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-[85vw] mx-auto px-4">
          <div className="text- mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our wide range of product categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {categories.map((category) => (
              <Link
                className=""
                key={category.id}
                href={`/shop/category/${category.name}`}
              >
                <Card
                  className={`hover:shadow-lg h-[200px] w-full transition-shadow cursor-pointer bg-cover`}
                  style={{
                    backgroundImage: `url(${category.image || "place.png"})`,
                  }}
                ></Card>
                <h3 className="font-semibold text-md text-center p-1 ">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-[85vw] mx-auto px-4">
          <div className="text- mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked products with the best deals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow group p-3"
              >
                <CardContent className="p-0">
                  <div className="relative bg-white py-2">
                    <div className="relative w-full h-48 rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <Badge
                      className="absolute top-2 left-2"
                      variant="secondary"
                    >
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
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
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">
                        ${product.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => window.open(product.amazonLink, "_blank")}
                    >
                      View on Amazon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              className={
                "hover:bg-[#f2f2ec] text-lg px-8 text-black/90 bg-white border-1"
              }
              size="lg"
              asChild
            >
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text- mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real reviews from satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full">
                      <Image
                        src={"/testimonial/img1.jpg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 1247,
    image: "/product_img/headphone.webp",
    badge: "Best Seller",
    amazonLink: "https://amazon.com/product1",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 892,
    image: "/product_img/headphone.webp",
    badge: "25% OFF",
    amazonLink: "https://amazon.com/product2",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 2156,
    image: "/product_img/headphone.webp",
    badge: "Limited Time",
    amazonLink: "https://amazon.com/product3",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviews: 634,
    image: "/product_img/headphone.webp",
    badge: "New Arrival",
    amazonLink: "https://amazon.com/product4",
  },
];

// const categories = [
//   {
//     name: "Electronics",
//     image: "/category/electronics.avif",
//     href: "/categories/electronics",
//   },
//   {
//     name: "Home & Garden",
//     image: "/category/home-n-garden.avif",
//     href: "/categories/home-garden",
//   },
//   {
//     name: "Fashion",
//     image: "/category/fashion.avif",
//     href: "/categories/fashion",
//   },
//   {
//     name: "Sports & Outdoors",
//     image: "/category/sport.avif",
//     href: "/categories/sports",
//   },
//   {
//     name: "Health & Beauty",
//     image: "/category/health-n-beauty.avif",
//     href: "/categories/health",
//   },
//   {
//     name: "Dogs Food & Treat",
//     image: "/category/dog-food.jpg",
//     href: "/categories/books",
//   },
//   {
//     name: "Home & Garden",
//     image: "/category/home-n-garden.avif",
//     href: "/categories/home-garden",
//   },
//   {
//     name: "Fashion",
//     image: "/category/fashion.avif",
//     href: "/categories/fashion",
//   },
//   {
//     name: "Sports & Outdoors",
//     image: "/category/sport.avif",
//     href: "/categories/sports",
//   },
//   {
//     name: "Health & Beauty",
//     image: "/category/health-n-beauty.avif",
//     href: "/categories/health",
//   },
// ];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Amazing products and fast delivery! I found exactly what I was looking for at great prices.",
    avatar: "/diverse-woman-avatar.png",
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment:
      "The product recommendations are spot on. Saved me hours of research and got the best deals.",
    avatar: "/man-avatar.png",
  },
  {
    name: "Emily Davis",
    rating: 4,
    comment:
      "Great selection and honest reviews. The affiliate links make shopping so much easier.",
    avatar: "/woman-avatar-2.png",
  },
];
