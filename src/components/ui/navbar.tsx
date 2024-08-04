import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import content from "@/data/home.content";
import { getIconForSocialMedia } from "@/content/footer";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="flex justify-between items-center h-20 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo.default.src}
            alt="TC Co. logo"
            width={120}
            height={22.7}
          />
        </Link>
        <Button
          variant="outline"
          className="border-none items-center text-primary"
          onClick={toggleMenu}
        >
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="capitalize ml-3">Menu</span>
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col px-4 md:px-6">
          <div className="flex-1 flex flex-col">
            {/* Row 1: Logo, social media links, close menu button */}
            <div className="flex justify-between items-center mb-8 h-20">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={logo.default.src}
                  alt="TC Co. logo"
                  width={120}
                  height={22.7}
                />
              </Link>
              {/* <div className="hidden md:flex space-x-4">
                {content.footer.social.links.map((link: any, index: number) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {getIconForSocialMedia(link.name)}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                ))}
              </div> */}
              <Button
                variant="outline"
                className="border-none items-center"
                onClick={toggleMenu}
              >
                <Cross1Icon className=" w-5 h-5" />
                <span className="capitalize ml-3">Close</span>

                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Row 2: Navigation menu items */}
            <nav className="flex-1 py-6">
              <div className="grid md:grid-cols-3 md:w-2/3 mx-auto h-full items-center text-3xl md:text-5xl justify-center">
                {links.map(({ title, href }) => (
                  <Link
                    key={`main-nav-link-${href}`}
                    href={href}
                    className={`transition-colors text-center hover:text-primary duration-300
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
            </nav>

            {/* Row 3: Copyright information */}
            <div className="mt-auto text-center text-sm text-muted-foreground py-10">
              <div className="flex flex-row space-x-4 mb-10 w-full justify-center">
                {content.footer.social.links.map((link: any, index: number) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {getIconForSocialMedia(link.name)}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                ))}
              </div>
              © {new Date().getFullYear()} TC Co. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
