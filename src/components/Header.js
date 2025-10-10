"use client";

import * as React from "react";
import Link from "next/link";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  Search,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import AnimatedSidebar from "./Sidebar";
import { Separator } from "./ui/separator";
import SearchOverlay from "./SearchOverlay";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Header() {
  return (
    <NavigationMenu
      className={"m-auto max-w-[98vw] lg:max-w-[85vw] z-50"}
      viewport={false}
    >
      <div className={"py-2 sm:py-5 flex list-none w-full"}>
        <AnimatedSidebar />
        <Link href={"/"} className="pl-2 pr-4">
          <Image
            className="w-10 h-auto"
            src={"/easyshop.png"}
            height={1000}
            width={1000}
            alt={"logo"}
          />
        </Link>

        {/* <div className="flex-1">
          <div
            className={`relative transition-all duration-700 border-none`}
            style={{ transitionDelay: "500ms" }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 text-sm focus-visible:ring-[0px] border-gray-300 shadow-none  placeholder:text-gray-500"
            />
          </div>
        </div> */}

        <SearchOverlay />

        {/* <NavigationMenuItem className={"sm:block hidden"}>
          <NavigationMenuTrigger
            className={
              "hover:bg-[#f2f2ec] text-[16px] font-semibold text-black/90"
            }
          >
            Brand
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="#" className="">
                    BestBuy
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="#">Home Depot</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="#">Whirlpool</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="#">Petco</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="#">Philips</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} text-[16px] font-semibold text-black/90 hover:text-black/90`}
          >
            <Link href="/shop">Shop</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className={"sm:block hidden"}>
          <NavigationMenuTrigger
            className={
              "hover:bg-[#f2f2ec] text-[16px] font-semibold text-black/90"
            }
          >
            Top Store
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="/brand/amazon">Amazon</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="/brand/ebay">eBay</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="/brand/etsy">Etsy</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="/brand/walmart">Walmart</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="/brand/target">Target</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href={`/brand/${encodeURIComponent("The Home Depot")}`}>
                    The Home Depot
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="/brand/nike">Nike</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={
                    "hover:bg-[#f2f2ec] text-black/90 hover:text-black/90"
                  }
                >
                  <Link href="/brand/wayfair">Wayfair</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </div>
    </NavigationMenu>
  );
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
