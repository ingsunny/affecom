import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/easyshop.png"
                alt="EasyShop Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <h3 className="text-lg font-semibold">EasyShop</h3>
            </div>
            <p className="text-sm text-background/80 mb-4">
              Your trusted source for the best product deals and reviews. We
              help you find quality products at unbeatable prices through our
              carefully curated affiliate partnerships.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Best Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            © 2024 EasyShop. All rights reserved. | Affiliate links may earn us
            a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
