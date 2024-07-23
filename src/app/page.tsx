import { Fragment } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import content from "@/data/home.content.json";
import { nl2br } from "@/content";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { VideoPlayer } from "@/components/ui/video-player";

import { MessageTicker } from "@/components/ui/message-ticker";
import { BrandCard } from "@/components/ui/brand-card";
import Link from "next/link";
import StyledContent from "@/components/ui/styled-text";
import Footer from "@/components/ui/footer";

const heroPhoto = require("@/assets/hero-photo.jpg");
const videoThumbnailPhoto = require("@/assets/video-thumb.jpg");
const visionCollage = require("@/assets/vision-collage.png");
const collagePhoto1 = require("@/assets/tcco-1.jpg");
const collagePhoto2 = require("@/assets/tcco-2.jpg");
const collagePhoto3 = require("@/assets/tcco-3.jpg");
const collagePhoto4 = require("@/assets/tcco-4.jpg");

const brandPhoto1 = require("@/assets/brand-1.jpg");
const brandPhoto2 = require("@/assets/brand-2.jpg");
const brandPhoto3 = require("@/assets/brand-3.jpg");
const brandPhoto4 = require("@/assets/brand-4.jpg");
const brandPhoto5 = require("@/assets/brand-5.jpg");

const brandPhotosList = [
  brandPhoto1.default.src,
  brandPhoto2.default.src,
  brandPhoto3.default.src,
  brandPhoto4.default.src,
  brandPhoto5.default.src,
];

export default async function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center py-12">
          <Image
            src={heroPhoto.default.src}
            alt="TC Co. - connecting african communities photo"
            layout="fill"
            objectFit="cover"
            className="z-0 object-top"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-20"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
          >
            <source src="/vids/hero-vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="z-30 text-white container lg:px-20">
            <h1 className="text-4xl md:text-7xl lg:text-7xl font-display uppercase mb-4">
              Connecting <br />
              <span className="text-primary">African</span> <br />
              communities
            </h1>
            <p className="text-[13px] md:text-2xl lg:text-2xl mb-4">
              {nl2br(content.hero.subtitle)}
            </p>
            <Button size="lg" asChild>
              <Link href={"/contact-us"}>
                {content.hero.buttonText} <ArrowRightIcon className="ml-3" />
              </Link>
            </Button>
          </div>
        </section>

        <div className="w-full flex justify-center items-center py-12 md:py-19">
          <p className="font-display uppercase text-base md:text-3xl">
            {content.video.title}
          </p>
        </div>

        {/* Video Section */}
        <section className="w-full aspect-video">
          <div className="">
            <VideoPlayer
              thumbnailSrc={videoThumbnailPhoto.default.src}
              videoSrc="/path/to/your/video.mp4"
              aspectRatio="16/9"
            />
          </div>
        </section>

        {/* Ticker */}
        <MessageTicker
          message="Thriving Communities Inspire Growth"
          isReversed
        />

        {/* 2-Column Grid Section */}
        <section className="lg:pl-8 pr-0 grid grid-rows-1 lg:grid-cols-2 relative lg:h-[48vw]">
          <div className="container md:px-20 flex items-center my-20 lg:my-0">
            <div>
              <h2 className="text-base md:text-2xl font-display uppercase mb-4">
                {content.vision.title}
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl">
                {content.vision.content}
              </p>
            </div>
          </div>
          <div className="w-full h-[100vw] lg:h-full relative lg:col-start-2 lg:col-span-1">
            <Image
              src={visionCollage.default.src}
              alt="TC Co. - connecting people photo"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:px-20 text-center">
          <div className="container md:px-20">
            <h2 className="text-base md:text-2xl font-display uppercase mb-4">
              {content.mission.title}
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl">
              {content.mission.content}
            </p>
          </div>
        </section>

        {/* Brands Section */}
        <section className="pb-20">
          <div className="container md:px-20">
            <div className="flex flex-wrap justify-center gap-8">
              {content.brands.items.map((item: any, index: number) => (
                <BrandCard
                  key={`${index}-brand-card`}
                  imageUrl={brandPhotosList[index]}
                  heading={item.heading}
                  subHeading={item.subHeading}
                  bodyText={item.bodyText}
                  learnMoreLink={item.learnMoreLink}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Keywords */}
        <section className="pt-20 pb-12 lg:px-20">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center">
              {content.keywords.words.map((word, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <span className="mx-2 text-white text-2xl">—</span>
                  )}
                  <span
                    className={`text-lg md:text-2xl lg:text-3xl ${
                      index % 2 === 0 ? "text-white" : "text-primary"
                    }`}
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Collage Section */}
        <section className=" mx-auto lg:px-20 m mb-20">
          <div className="container grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-rows-2 lg:grid-cols-3 gap-4">
            {/* Image 1: Full height on desktop, full width on mobile */}
            <div className="relative h-[240px] md:h-full md:col-span-2 lg:col-span-1 md:row-span-1 lg:row-span-2">
              <Image
                src={collagePhoto1.default.src}
                alt="Image 1"
                layout="fill"
                objectFit="cover"
                className="lg:object-left"
              />
            </div>

            {/* Image 2: Top right on desktop, second row left on mobile */}
            <div className="relative h-[240px] md:col-span-1">
              <Image
                src={collagePhoto2.default.src}
                alt="Image 2"
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Image 3: Top right on desktop, second row right on mobile */}
            <div className="relative h-[240px] md:col-span-1">
              <Image
                src={collagePhoto3.default.src}
                alt="Image 3"
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Image 4: Bottom right on desktop, bottom on mobile */}
            <div className="relative h-[240px] md:col-span-2">
              <Image
                src={collagePhoto4.default.src}
                alt="Image 4"
                layout="fill"
                objectFit="cover"
                className="object-top"
              />
            </div>
          </div>
        </section>

        {/* Ticker 2 */}
        <div className="hidden lg:block">
          <MessageTicker message="Thriving Communities Inspire Growth" />
        </div>
      </main>
      <Footer />
    </>
  );
}
