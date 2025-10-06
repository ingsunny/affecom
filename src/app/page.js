"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  ArrowRight,
  MinusCircle,
  PlusCircle,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import categories from "@/data/categories";
import { useData } from "@/DataContext";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules from Swiper
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { ShoppingCart, ArrowRightCircle } from "lucide-react";

// --- MOCK DATA for stores ---
// In a real app, this would come from an API.
// Using a logo service for placeholder images.
const storesData = [
  {
    id: 1,
    name: "Walmart",
    logoUrl: "https://logo.clearbit.com/walmart.com",
    offerText: "Up to 50% Off",
    offerValue: 50,
    link: "https://www.walmart.com",
  },
  {
    id: 2,
    name: "Target",
    logoUrl: "https://logo.clearbit.com/target.com",
    offerText: "Save 30% on Essentials",
    offerValue: 30,
    link: "https://www.target.com",
  },
  {
    id: 3,
    name: "Best Buy",
    logoUrl: "https://logo.clearbit.com/bestbuy.com",
    offerText: "Up to 40% Off Electronics",
    offerValue: 40,
    link: "https://www.bestbuy.com",
  },
  {
    id: 4,
    name: "Amazon",
    logoUrl: "https://logo.clearbit.com/amazon.com",
    offerText: "Up to 70% Off Daily Deals",
    offerValue: 70,
    link: "https://www.amazon.com",
  },
  {
    id: 5,
    name: "Sephora",
    logoUrl: "https://logo.clearbit.com/sephora.com",
    offerText: "Beauty Deals – 25% Off",
    offerValue: 25,
    link: "https://www.sephora.com",
  },
  {
    id: 6,
    name: "Nike",
    logoUrl: "https://logo.clearbit.com/nike.com",
    offerText: "Extra 20% Off Sale",
    offerValue: 20,
    link: "https://www.nike.com",
  },
  {
    id: 7,
    name: "Adidas",
    logoUrl: "https://logo.clearbit.com/adidas.com",
    offerText: "Up to 50% Off Footwear",
    offerValue: 50,
    link: "https://www.adidas.com",
  },
  {
    id: 8,
    name: "Macy's",
    logoUrl: "https://logo.clearbit.com/macys.com",
    offerText: "Up to 60% Off Fashion",
    offerValue: 60,
    link: "https://www.macys.com",
  },
  {
    id: 9,
    name: "Costco",
    logoUrl: "https://logo.clearbit.com/costco.com",
    offerText: "Save on Bulk & Groceries",
    offerValue: 35,
    link: "https://www.costco.com",
  },
];

const TopStoresGrid = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-8">
          Top Stores To Bag
        </h2>

        {/* Responsive Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Map through store data to create cards */}
          {storesData.map((store) => (
            <a
              key={store.id}
              href={store.link}
              className="group relative flex flex-col items-center justify-between text-center border rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
            >
              {/* Store Image */}
              <div className="w-full h-32 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src={store.logoUrl}
                  alt={`${store.name} logo`}
                  className="max-h-20 max-w-full object-contain"
                />
              </div>

              {/* Offer Info */}
              <div className="p-3 w-full bg-white">
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {store.offerText}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-blue-600 bg-opacity-80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-5xl font-extrabold text-white">
                  {store.offerValue}%
                </span>
                <span className="text-lg font-medium text-white">OFF</span>
              </div>
            </a>
          ))}

          {/* "View All" Card */}
          <a
            href="#"
            className="group flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg bg-gray-50 transition-all duration-300 ease-in-out hover:border-blue-600 hover:bg-white hover:shadow-xl"
          >
            <div className="p-4">
              <ArrowRightCircle className="h-12 w-12 text-gray-400 group-hover:text-blue-600 transition-colors" />
              <p className="mt-2 text-sm font-semibold text-gray-800 group-hover:text-blue-600">
                View All Stores
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

// --- General Images ---
// You can replace these with your own image URLs
const sliderImages = [
  "/bg1.jpg",
  "https://www.easyshop.coupons/img/2.png",
  "https://www.easyshop.coupons/img/3.png",
  "https://www.easyshop.coupons/img/4.png",
];

const ImageSlider = () => {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto">
        <Swiper
          // Install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="mySwiper" // You can use this class for custom styling
        >
          {sliderImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`General content slide ${index + 1}`}
                className="w-full h-72 object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default function Home() {
  const router = useRouter();
  const { products, loading, error } = useData();
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 4));
  }, [products]);

  return (
    <div className="min-h-screen ">
      {/* Hero section  */}
      <section className="relative sm:h-[200px]">
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

        <div className="relative max-w-[98vw] lg:max-w-[85vw] mx-auto flex flex-col sm:flex-row items-center justify-between h-full px-2 lg:px-4 pt-4 pb-6 sm:pb-0">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-balance">
              Discover Amazing Products at <br /> Unbeatable Prices
            </h1>
            <p className="text-md md:text-lg text-white mb-8 max-w-2xl mx- text-pretty">
              Find the best deals on top-rated products from trusted brands.
              Compare prices and read real reviews.
            </p>
          </div>
          <div className="flex w-fit flex-col gap-4 justify-center">
            <Button
              onClick={() => router.push("/shop")}
              size="lg"
              className="text-md sm:text-lg px-8"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button
              onClick={() => router.push("#categories")}
              size="lg"
              className="hover:bg-[#f2f2ec] text-md sm:text-lg px-8 text-black/90 bg-white"
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
          <div className="flex sm:flex-row flex-col items-center justify-center gap-8 text-sm font-medium">
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

      <ImageSlider />

      {/* --- NEW TOP STORES GRID GOES HERE --- */}
      <TopStoresGrid />

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover products tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/category/${category.name}`}
                className="group relative block rounded-lg overflow-hidden shadow-lg"
              >
                {/* Image with hover effect */}
                <img
                  src={category.image || "https://via.placeholder.com/400x500"}
                  alt={category.name}
                  className="w-full h-80 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <div className="flex items-center text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>Shop Now</span>
                    <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-[98vw] lg:max-w-[85vw] mx-auto px-4">
          <div className="text- mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked products with the best deals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {randomProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow group p-3"
                onClick={() => window.open(product.product_link)}
              >
                <CardContent className="p-0">
                  <div className="relative bg-white py-2">
                    <div className="relative w-full h-48 rounded-t-lg">
                      <Image
                        src={product.imageLink || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <Badge
                      className="absolute top-2 left-2"
                      variant="secondary"
                    >
                      {product.brand}
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
                        {product.rating} ({product.review})
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
                    <Button className="w-full" size="sm">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real reviews from our vibrant community of shoppers.
            </p>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            // Responsive breakpoints
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="pb-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col p-8 relative">
                  <Quote className="absolute top-6 left-6 w-16 h-16 text-gray-100" />

                  <div className="relative z-10">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 font-serif italic mb-6 text-base leading-relaxed flex-grow">
                      "{testimonial.comment}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                      />
                      <div>
                        <h4 className="font-bold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* // faq  */}

      <FaqSection />
    </div>
  );
}

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 focus:outline-none"
        onClick={onClick}
      >
        <span>{question}</span>
        {isOpen ? (
          <MinusCircle className="h-6 w-6 text-primary" />
        ) : (
          <PlusCircle className="h-6 w-6 text-gray-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
};

// Main FAQ Section Component
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-muted/40 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? We've got answers.
          </p>
        </div>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const faqData = [
  {
    question: "What is EasyShop?",
    answer: `EasyShop is an affiliate platform that helps you find the best deals, discounts, and live sales from top online stores. We curate the latest offers so you can shop smart and save more.

1. Browse EasyShop to discover the latest deals and discounts.
2. Click on "Activate Deal" or "Get Coupon".
3. You’ll be redirected to the retailer’s website. Complete your shopping there.
4. Enjoy exclusive savings and cashback rewards when applicable.

Where does the cashback come from?  
EasyShop partners with online stores to bring you the best deals. When you shop through us, we earn a commission from the retailer and pass a portion of it back to you as cashback.`,
  },
  {
    question: "How does EasyShop work?",
    answer: `EasyShop partners with leading e-commerce websites to bring you exclusive deals and discounts. When you shop through our links, you get access to the best offers, and we earn a small commission at no extra cost to you.

1. Exclusive Discounts & Cashback – latest discounts & cashback deals.  
2. Smart Shopping Assistant – Chrome extension & Android app help you shop smarter.  
3. Special Coupon Codes – exclusive coupons from top brands.  
4. One-Stop Deal Finder – browse & compare deals in one place.  
5. Product-Specific Deals – find gadget/fashion deals with cashback info.  
6. Stay Updated – subscribe to our newsletter.`,
  },
  {
    question: "What are the benefits of using EasyShop?",
    answer: `• Get real-time updates on live sales and limited-time deals.  
• Discover the latest discounts from multiple online stores in one place.  
• Shop conveniently with verified and curated offers.`,
  },
  {
    question: "How often are deals updated on EasyShop?",
    answer: `We update deals and offers daily to ensure you get the latest and best discounts from various e-commerce platforms.`,
  },
  {
    question: "Is EasyShop free to use?",
    answer: `Yes! EasyShop is completely free to use. You don’t need to sign up or pay any fees to access the best deals and discounts.`,
  },
  {
    question: "Does EasyShop sell products directly?",
    answer: `No, EasyShop does not sell products. We direct you to trusted online retailers where you can complete your purchase at the best available price.`,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    title: "Verified Buyer, Delhi",
    img: "https://i.pravatar.cc/150?u=priya",
    rating: 5,
    comment:
      "The quality of the product exceeded my expectations. The delivery was incredibly fast, and the customer service was top-notch. I will definitely be shopping here again!",
  },
  {
    name: "Rohan Verma",
    title: "First-time Customer, Mumbai",
    img: "https://i.pravatar.cc/150?u=rohan",
    rating: 5,
    comment:
      "I was hesitant to order online, but this store made the process so smooth. The website is easy to navigate, and my order arrived in perfect condition. Highly recommended.",
  },
  {
    name: "Anjali Singh",
    title: "Fashion Blogger, Bangalore",
    img: "https://i.pravatar.cc/150?u=anjali",
    rating: 4,
    comment:
      "A great collection of trendy items. While my order took a day longer than expected, the quality of the apparel was fantastic. I'm very happy with my purchase.",
  },
  {
    name: "Vikram Patel",
    title: "Repeat Customer, Chennai",
    img: "https://i.pravatar.cc/150?u=vikram",
    rating: 5,
    comment:
      "This is my go-to store for all my needs. They have never disappointed me. Consistent quality, fair prices, and reliable delivery every single time. A trustworthy brand.",
  },
];
