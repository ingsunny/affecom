"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "What is EasyShop?",
    answer: (
      <>
        <p>
          EasyShop is an affiliate platform that helps you find the best deals,
          discounts, and live sales from top online stores. We curate the latest
          offers so you can shop smart and save more.
        </p>
        <ol className="list-decimal list-inside mt-2 mb-2">
          <li>Browse EasyShop to discover the latest deals and discounts.</li>
          <li>
            Click on <strong className="text-red-600">"Activate Deal"</strong>{" "}
            or <strong className="text-red-600">"Get Coupon"</strong>
          </li>
          <li>
            You’ll be redirected to the retailer’s website. Complete your
            shopping there.
          </li>
          <li>Enjoy exclusive savings and cashback rewards when applicable.</li>
        </ol>
        <p>
          EasyShop partners with online stores to bring you the best deals. When
          you shop through us, we earn a commission from the retailer and pass a
          portion of it back to you as cashback.
        </p>
        <p>
          For any queries, visit our{" "}
          <Link href="/contact" className="text-blue-600 underline">
            Contact Us
          </Link>{" "}
          page or email us at <span>[email protected]</span>
        </p>
      </>
    ),
  },
  {
    question: "How does EasyShop work?",
    answer: (
      <>
        <p>
          EasyShop partners with leading e-commerce websites to bring you
          exclusive deals and discounts. When you shop through our links, you
          get access to the best offers, and we earn a small commission at no
          extra cost to you.
        </p>
        <ul className="list-disc list-inside mt-2 mb-2">
          <li>
            <strong>Exclusive Discounts & Cashback:</strong> Latest discounts,
            offers, and cashback deals across multiple e-commerce platforms.
          </li>
          <li>
            <strong>Smart Shopping Assistant:</strong> Notifications through our
            Chrome extension or app about the best deals.
          </li>
          <li>
            <strong>Special Coupon Codes:</strong> Exclusive coupons from top
            brands and categories.
          </li>
          <li>
            <strong>One-Stop Deal Finder:</strong> Compare deals from different
            stores in one place.
          </li>
          <li>
            <strong>Product-Specific Deals:</strong> Cashback details for
            specific gadgets, fashion items, or products.
          </li>
          <li>
            <strong>Stay Updated:</strong> Subscribe to our newsletter to get
            latest offers.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What are the benefits of using EasyShop?",
    answer: (
      <>
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>Real-time updates:</strong> Get live notifications on flash
            sales and seasonal discounts.
          </li>
          <li>
            <strong>All-in-one discounts:</strong> Discover latest discounts
            from multiple online stores in one place.
          </li>
          <li>
            <strong>Verified & curated offers:</strong> Shop confidently with
            deals checked by our team.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How often are deals updated on EasyShop?",
    answer: (
      <p>
        <strong>We update deals daily</strong> to ensure you get the latest and
        best discounts from various e-commerce platforms.
      </p>
    ),
  },
  {
    question: "Is EasyShop free to use?",
    answer: (
      <p>
        <strong>Yes! EasyShop is completely free to use.</strong> No signup or
        fees are required to access the deals.
      </p>
    ),
  },
  {
    question: "Does EasyShop sell products directly?",
    answer: (
      <p>
        <strong>No, EasyShop does not sell products.</strong> We redirect you to
        trusted online retailers to complete your purchase at the best available
        price.
      </p>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion(idx)}
                className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <span
                  className={`transition-transform ${
                    openIndex === idx ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === idx && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
