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
    <NavigationMenu className={"m-auto max-w-6xl"} viewport={false}>
      <NavigationMenuList className={"py-5 gap-4"}>
        <AnimatedSidebar />
        <div className="">
          <Image
            className="w-10 h-auto"
            src={"/logo.jpg"}
            height={1000}
            width={1000}
            alt={"logo"}
          />
          {/* <h3 className="text-2xl font-semibold">EasyShop</h3> */}
        </div>
        <div className="">
          <div
            className={`relative transition-all duration-700 w-xl border-none`}
            style={{ transitionDelay: "500ms" }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 focus-visible:ring-[0px]  border-gray-300 shadow-none  placeholder:text-gray-500"
            />
          </div>
        </div>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={" hover:bg-[#f2f2ec] text-black hover:text-black"}
          >
            Brands
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      shop by brand
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully curated prodcut
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Introduction">
                make it Beautifully by brand
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} hover:bg-[#f2f2ec] text-black hover:text-black`}
          >
            <Link href="/shop">Shop</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={"hover:bg-[#f2f2ec] text-black hover:text-black"}
          >
            Welcome
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Login</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">Signup</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
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
