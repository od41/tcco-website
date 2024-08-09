"use client";
import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import content from "@/data/home.content";
import { nl2br } from "@/content";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { VideoPlayer } from "@/components/ui/video-player";

import { MessageTicker } from "@/components/ui/message-ticker";
import { BrandCard } from "@/components/ui/brand-card";
import Link from "next/link";
import Footer from "@/components/ui/footer";
import Head from "next/head";
import { AnimatedText } from "@/components/ui/animated-text";
import { FadeIn } from "@/components/ui/fade-in";

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
  // brandPhoto3.default.src,
  // brandPhoto4.default.src,
  brandPhoto5.default.src,
];

const containerAnimation = {
  hidden: {},
  visible: {},
};

const childAnimation = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    // @ts-expect-error
    videoRef.current!.playbackRate = 0.5;
  }, []);

  return (
    <>
      <Head>
        <title>TC Co. - Connecting African Communities</title>
      </Head>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[100vh] flex items-center justify-center py-12">
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
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
          >
            <source src="/vids/hero-vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="z-30 text-white container lg:px-20">
            <div className="text-4xl md:text-7xl lg:text-7xl font-display uppercase mb-4">
              <AnimatedText text="Connecting" initialDelay={0.8} once />
              <AnimatedText
                text="African"
                className="text-primary"
                initialDelay={1.2}
                once
              />
              <AnimatedText text="communities" initialDelay={1} once />
            </div>
            <FadeIn initialDelay={0.9} once>
              <p className="text-[13px] md:text-2xl lg:text-2xl mb-4">
                {nl2br(content.hero.subtitle)}
              </p>
            </FadeIn>
            <FadeIn initialDelay={1.2} once>
              <Button size="lg" asChild>
                <Link href={"/contact-us"}>
                  {content.hero.buttonText} <ArrowRightIcon className="ml-3" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </section>

        <div className="w-full flex justify-center items-center py-12 md:py-19">
          <FadeIn once>
            <p className="font-display uppercase text-base md:text-3xl">
              {content.video.title}
            </p>
          </FadeIn>
        </div>

        {/* Video Section */}
        <section className="w-full aspect-video">
          <FadeIn initialDelay={0.3} once>
            <div className="">
              <VideoPlayer
                thumbnailSrc={videoThumbnailPhoto.default.src}
                videoSrc="/path/to/your/video.mp4"
                aspectRatio="16/9"
              />
            </div>
          </FadeIn>
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
              <FadeIn initialDelay={0.1} once>
                <h2 className="text-base md:text-2xl font-display uppercase mb-4">
                  {content.vision.title}
                </h2>
              </FadeIn>
              <FadeIn initialDelay={0.3} once>
                <p className="text-2xl md:text-3xl lg:text-4xl">
                  {content.vision.content}
                </p>
              </FadeIn>
            </div>
          </div>
          <FadeIn direction="down" once>
            <div className="w-full h-[100vw] lg:h-full relative lg:col-start-2 lg:col-span-1">
              <Image
                src={visionCollage.default.src}
                alt="TC Co. - connecting people photo"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </FadeIn>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:px-20 text-center">
          <div className="container md:px-20">
            <FadeIn initialDelay={0.1} once>
              <h2 className="text-base md:text-2xl font-display uppercase mb-4">
                {content.mission.title}
              </h2>
            </FadeIn>
            <FadeIn initialDelay={0.3} once>
              <p className="text-2xl md:text-3xl lg:text-4xl">
                {content.mission.content}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Brands Section */}
        <section className="pb-20">
          <div className="container md:px-20">
            <div className="flex flex-wrap justify-center gap-8">
              {content.brands.items.map((item: any, index: number) => {
                if (index >= 2) return;
                return (
                  <FadeIn
                    key={`${index}-brand-card`}
                    direction="left"
                    initialDelay={(index + 1) * 0.3}
                    className=" w-full lg:w-[48%]"
                    once
                  >
                    <BrandCard
                      imageUrl={brandPhotosList[index]}
                      heading={item.heading}
                      subHeading={item.subHeading}
                      bodyText={item.bodyText}
                      learnMoreLink={item.learnMoreLink}
                    />
                  </FadeIn>
                );
              })}
              <FadeIn initialDelay={0.3} once>
                <Button size="lg" asChild>
                  <Link href={"/engage"}>
                    View All <ArrowRightIcon className="ml-3" />
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Keywords */}
        <section className="pt-20 pb-12 lg:px-20">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center">
              {content.keywords.words.map((word, index) => (
                <FadeIn
                  key={`${index}-keyword`}
                  initialDelay={(index + 1) * 0.3}
                  once
                >
                  <Fragment>
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
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Collage Section */}
        <section className=" mx-auto lg:px-20 m mb-20">
          <div className="container grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-rows-2 lg:grid-cols-3 gap-4">
            {/* Image 1: Full height on desktop, full width on mobile */}
            <FadeIn
              initialDelay={0.5}
              className="h-[240px] md:h-full md:col-span-2 lg:col-span-1 md:row-span-1 lg:row-span-2"
              once
            >
              <div className="relative h-[240px] md:h-full md:col-span-2 lg:col-span-1 md:row-span-1 lg:row-span-2">
                <Image
                  src={collagePhoto1.default.src}
                  alt="Image 1"
                  layout="fill"
                  objectFit="cover"
                  className="lg:object-left"
                />
              </div>
            </FadeIn>

            {/* Image 2: Top right on desktop, second row left on mobile */}
            <FadeIn initialDelay={0.5} direction="down" once>
              <div className="relative h-[240px] md:col-span-1">
                <Image
                  src={collagePhoto2.default.src}
                  alt="Image 2"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </FadeIn>

            {/* Image 3: Top right on desktop, second row right on mobile */}
            <FadeIn
              initialDelay={0.6}
              direction="down"
              className="h-[240px] md:col-span-1"
              once
            >
              <div className="relative h-[240px] md:col-span-1">
                <Image
                  src={collagePhoto3.default.src}
                  alt="Image 3"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </FadeIn>

            {/* Image 4: Bottom right on desktop, bottom on mobile */}
            <FadeIn initialDelay={0.6} className="h-[240px] md:col-span-2" once>
              <div className="relative h-[240px] md:col-span-2">
                <Image
                  src={collagePhoto4.default.src}
                  alt="Image 4"
                  layout="fill"
                  objectFit="cover"
                  className="object-top"
                />
              </div>
            </FadeIn>
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
