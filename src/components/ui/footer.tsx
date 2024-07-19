import React from "react";
import Image from "next/image";
import content from "@/data/content.json";
import { Button } from "./button";
import Link from "next/link";

const logo = require("@/assets/logo-white.png");

const Footer = () => {
  return (
    <>
      {/* Footer Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src={content.hero.background}
          alt="TC Co. - connecting african communities photo"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {content.footer.about.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {content.footer.about.subtitle}
          </p>
          <Button size="lg">{content.footer.about.buttonText}</Button>
        </div>
      </section>
      <footer className="relative py-16 px-4 md:px-8 text-white">
        {/* <Image
          src="/footer-bg.jpg"
          alt="Footer background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        /> */}
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
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
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">
              {content.footer.contact.title}
            </h3>
            <p>Email: {content.footer.contact.email}</p>
            <p>Phone: {content.footer.contact.phone}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">
              {content.footer.social.title}
            </h3>
            <div className="flex space-x-4">
              {content.footer.social.links.map((link: any, index: any) => (
                <a key={index} href={link.url} className="hover:text-gray-300">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
