import React from "react";
import Image from "next/image";
import content from "@/data/home.content";
import { Button } from "./button";
import Link from "next/link";
import { nl2br } from "@/content";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getIconForSocialMedia } from "@/content/footer";
import { AnimatedText } from "./animated-text";
import { FadeIn } from "./fade-in";

const logo = require("@/assets/logo-white.png");
const footerPhoto = require("@/assets/footer-photo.jpg");

const Footer = ({ isMini = false }: { isMini?: boolean }) => {
  return (
    <>
      {/* Footer Section */}
      {!isMini && (
        <section className="relative h-[480px] flex items-start justify-center">
          <Image
            src={footerPhoto.default.src}
            alt="TC Co. - connecting with us photo"
            layout="fill"
            objectFit="cover"
            className="z-0 object-top"
          />
          <div className="z-10 text-white container lg:px-20 mt-[90px]">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-display uppercase text-primary mb-3">
              <AnimatedText text={content.footer.about.title} once />
            </h1>
            <FadeIn initialDelay={0.4} once>
              <div className="text-xl md:text-xl mb-4 leading-7">
                {nl2br(content.footer.about.subtitle)}
              </div>
            </FadeIn>
            <FadeIn initialDelay={0.6} once>
              <Button size="lg" asChild>
                <Link href={"/contact-us"}>
                  {content.footer.about.buttonText}{" "}
                  <ArrowRightIcon className="ml-3" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </section>
      )}
      <footer className="relative py-16 text-white border-t border-">
        <FadeIn initialDelay={0.1} direction="down" once>
          <>
            <div className="relative z-10 container lg:px-20 grid md:grid-cols-3 gap-8">
              <div className="">
                <Link href="/" className="">
                  <Image
                    src={logo.default.src}
                    // className="h-6 w-6"
                    alt="TC Co. logo"
                    width={120}
                    height={22.7}
                  />
                </Link>
              </div>
              <div className="flex gap-24 md:justify-end md:col-span-2">
                <div className="grid gap-2">
                  {content.footer.footerPages.links.map(
                    (link: any, index: any) => (
                      <Link key={link.url} href={`/${link.url}`} className="">
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
                <div>
                  <div className="hidden md:flex space-x-6 ">
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
                </div>
              </div>
            </div>
            <div className="container lg:px-20">
              <p className="text-md mt-10">(C) All rights reserved, 2024</p>
              <div className="flex space-x-6 md:hidden mt-5">
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
            </div>
          </>
        </FadeIn>
      </footer>
    </>
  );
};

export default Footer;
