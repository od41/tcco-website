import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import content from "@/data/home.content";
import { getIconForSocialMedia } from "@/content/footer";
import { useAnimation, motion, easeInOut } from "framer-motion";
import { FadeIn } from "./fade-in";

const logo = require("@/assets/logo_full_white_1.png");

export const links: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",
    description: "Home page",
  },
  {
    title: "Discover",
    href: "/discover/",
    description: "Discover businesses within the community",
  },
  {
    title: "Engage",
    href: "/engage/",
    description: "Engage with our brands and communitites",
  },
  {
    title: "Join Us",
    href: "/join-us/",
    description: "Contact TCCo.",
  },
];

export function Navbar() {
  const currentPath = usePathname();
  const controls = useAnimation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const toggleMenu = async () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      await controls.start("hidden");
    } else {
      await controls.start("visible");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="flex justify-between items-center h-20 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo.default.src}
            alt="TCCo. logo"
            width={120}
            height={22.7}
          />
        </Link>
        {/* <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} /> // TODO */}
        <Button
          variant="outline"
          className="border border-primary hover:bg-primary hover:text-background items-center text-primary"
          onClick={async () => await toggleMenu()}
        >
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="capitalize ml-3">Menu</span>
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </div>

      {isMenuOpen && (
        <motion.nav
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 0.1, ease: easeInOut },
            },
            hidden: { opacity: 0 },
          }}
          className="fixed inset-0 bg-background z-50 flex flex-col px-4 md:px-6"
        >
          <div className="flex-1 flex flex-col">
            {/* Row 1: Logo, social media links, close menu button */}
            <div className="flex justify-between items-center mb-8 h-20">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={logo.default.src}
                  alt="TCCo. logo"
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
                className="border-transparent items-center hover:border hover:border-primary hover:text-primary"
                onClick={toggleMenu}
              >
                <Cross1Icon className=" w-5 h-5" />
                <span className="capitalize ml-3">Close</span>

                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Row 2: Navigation menu items */}
            <nav className="flex-1 py-6">
              <div className="grid md:grid-cols-4 w-full lg:w-2/3 mx-auto h-auto md:h-full gap-10 mt-[8rem] md:mt-0 md:gap-0 items-center text-4xl md:text-3xl justify-center">
                {links.map(({ title, href }, index) => (
                  <FadeIn
                    key={`main-nav-link-${href}`}
                    initialDelay={(index + 1) * 0.2}
                    once
                  >
                    <Link
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
                  </FadeIn>
                ))}
              </div>
            </nav>

            {/* Row 3: Copyright information */}
            <FadeIn initialDelay={0.1} once>
              <div className="mt-auto text-center text-sm text-muted-foreground py-10">
                <div className="flex flex-row space-x-4 mb-10 w-full justify-center">
                  {content.footer.social.links.map(
                    (link: any, index: number) => (
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
                    )
                  )}
                </div>
                © {new Date().getFullYear()} TCCo. All rights reserved.
              </div>
            </FadeIn>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-4 right-4 z-50 p-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="w-8 h-8 flex flex-col justify-around">
        <motion.span
          className="w-full h-1 bg-white"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 10 : 0 }}
        />
        <motion.span
          className="w-full h-1 bg-white"
          animate={{ opacity: isOpen ? 0 : 1 }}
        />
        <motion.span
          className="w-full h-1 bg-white"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -10 : 0 }}
        />
      </div>
    </motion.button>
  );
};
