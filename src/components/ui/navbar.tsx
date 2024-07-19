"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

const logo = require("@/assets/logo-white.png");

export const links: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",
    description: "Home page",
  },
  {
    title: "Engage",
    href: "/engage",
    description: "Engage with our brands and communitites",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    description: "Contact TC Co.",
  },
];

export function Navbar() {
  const currentPath = usePathname();

  return (
    <header className="sticky top-0 bg-background flex w-full justify-between h-20 items-center gap-4 px-4 md:px-6 md:mb-12">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src={logo.default.src}
            // className="h-6 w-6"
            alt="TC Co. logo"
            width={120}
            height={22.7}
          />
        </Link>
      </nav>

      <div className="md:flex hidden w-fit px-4 py-2 rounded-md items-center justify-end gap-4 md:ml-auto md:gap-6 bg-background">
        {links.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className={`transition-colors text-sm hover:text-primary 
                  ${
                    currentPath === href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                `}
          >
            {title}
          </Link>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <HamburgerMenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[calc(100vw-2em)] ml-4 bg-background"
          align="center"
          sideOffset={20}
        >
          <nav className="grid gap-6 text-lg font-medium">
            {links.map(({ title, href }) => (
              <Link
                key={`main-nav-link-${href}`}
                href={href}
                className={`transition-colors hover:text-primary 
                  ${
                    currentPath === href
                      ? "text-primary "
                      : "text-muted-foreground"
                  }
                `}
              >
                {title}
              </Link>
            ))}
          </nav>
        </PopoverContent>
      </Popover>
    </header>
  );
}
