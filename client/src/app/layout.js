import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DataProvider } from "@/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EasyShop - Discover & Buy the Best Products Online",
  description:
    "EasyShop brings you curated affiliate products from top brands. Compare, review, and shop your favorite gadgets, fashion, home appliances, and more.",
  keywords: [
    "EasyShop",
    "affiliate products",
    "online shopping",
    "best deals",
    "gadgets",
    "fashion",
    "home appliances",
    "product reviews",
  ],
  authors: [{ name: "EasyShop Team", url: "https://easyshopprice.com" }],
  creator: "EasyShop",
  publisher: "EasyShop",
  robots: "index, follow",
  metadataBase: new URL("https://easyshopprice.com"),
  // themeColor: "#FFD700", // gold color
  icons: {
    icon: "/easyshop.png", // basic favicon
    shortcut: "/easyshop.png",
    apple: "/easyshop.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easyshopprice.com",
    title: "EasyShop - Discover & Buy the Best Products Online",
    description:
      "EasyShop brings you curated affiliate products from top brands. Compare, review, and shop your favorite gadgets, fashion, home appliances, and more.",
    siteName: "EasyShop",
    images: [
      {
        url: "/easyshop.png",
        width: 1200,
        height: 630,
        alt: "EasyShop Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easyshop",
    title: "EasyShop - Discover & Buy the Best Products Online",
    description:
      "EasyShop brings you curated affiliate products from top brands. Compare, review, and shop your favorite gadgets, fashion, home appliances, and more.",
    images: ["/easyshop.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <DataProvider>
          <Header />
          {children}
          <Footer />
        </DataProvider>
      </body>
    </html>
  );
}
