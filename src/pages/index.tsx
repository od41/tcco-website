"use client";
import { Fragment, useEffect, useRef, useState } from "react";
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
import AnimatedCounter from "@/components/ui/animated-counter";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  firestore,
  BUSINESS_COLLECTION,
  LOCATIONS_COLLECTION,
} from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import {
  VerifiedIcon,
  ViewsIcon,
  ViewBusinessIcon,
} from "@/components/ui/icons";
import { Spinner } from "@/components/ui/spinner";
import type { Business } from "@/api/directory";

const heroPhoto = require("@/assets/hero-background-static.png");
const videoThumbnailPhoto = require("@/assets/video-thumb.png");
const VIDEO_SOURCE = process.env.NEXT_PUBLIC_VIDEO_SOURCE
  ? process.env.NEXT_PUBLIC_VIDEO_SOURCE
  : "";
const visionCollage = require("@/assets/vision-collage.png");
const collagePhoto1 = require("@/assets/image00145.jpeg");
const collagePhoto2 = require("@/assets/tcco-2.jpg");
const collagePhoto3 = require("@/assets/tcco-3.jpg");
const collagePhoto4 = require("@/assets/tcco-4.jpg");

const brandPhoto1 = require("@/assets/brand-1-new.jpg");
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

export default function Home() {
  // const videoRef = useRef(null);

  // useEffect(() => {
  //   // @ts-expect-error
  //   videoRef.current!.playbackRate = 0.2;
  // }, []);

  return (
    <>
      <Head>
        <title>TCCo. - Connecting SMB Communities</title>
      </Head>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[85vh] md:h-[100vh] flex items-center justify-center py-12">
          <Image
            src={heroPhoto.default.src}
            alt="TCCo. - connecting smb communities photo"
            layout="fill"
            objectFit="cover"
            className="z-0 object-top"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-20"></div>
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
          >
            <source src="/vids/hero-vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <div className="z-30 text-white container lg:px-20">
            <div className="text-2xl sm:text-4xl md:text-7xl lg:text-7xl font-display uppercase mb-4">
              <AnimatedText text="Connecting" initialDelay={0.8} once />
              <AnimatedText
                text="SMB"
                className="text-primary"
                initialDelay={1.2}
                once
              />
              <AnimatedText text="communities" initialDelay={1} once />
            </div>
            <FadeIn initialDelay={0.9} once>
              <p className="text-[13px] md:text-2xl lg:text-2xl mb-4 w-full lg:w-2/3">
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

        {/* Ticker */}
        <MessageTicker message="Thriving Communities Inspire Growth" />

        {/* Impact numbers */}
        <section className="py-12">
          <div className="container mx-auto">
            {/* <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.impactNumbers.items.map((item, index) => (
                <div key={`${index}-impact`} className="text-center p-4">
                  <div className="text-4xl lg:text-5xl lg:text-[90px] font-display text-white mb-1 leading-none">
                    <AnimatedCounter
                      from={0}
                      to={Number(item.value)}
                      duration={3}
                    />
                    {item.suffix}
                  </div>
                  <div className="text-lg text-primary capitalize">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ticker */}
        <MessageTicker
          message="Thriving Communities Inspire Growth"
          isReversed={true}
        />

        {/* <div className="w-full flex justify-center items-center py-12 md:py-19">
          <FadeIn once>
            <p className="font-display uppercase text-base md:text-3xl">
              {content.video.title}
            </p>
          </FadeIn>
        </div> */}

        {/* Video Section */}
        {/* <section className=" aspect-videoqa w-[600px] my-16 container mx-auto">
          <FadeIn initialDelay={0.3} once>
            <div className="h-[50%]">
              <VideoPlayer
                thumbnailSrc={videoThumbnailPhoto.default.src}
                videoSrc={VIDEO_SOURCE}
                aspectRatio="16/9"
              />
            </div>
          </FadeIn>
        </section> */}

        {/* Ticker */}
        {/* <MessageTicker
          message="Thriving Communities Inspire Growth"
          isReversed
        /> */}

        {/* 2-Column Grid Section */}
        <section className="lg:pl-8 pr-0 grid grid-rows-1 lg:grid-cols-2 relative llg:h-[35.5vw]">
          <div className="container md:px-20 flex items-center my-20 lg:my-0">
            <div>
              <FadeIn initialDelay={0.1} once>
                <h2 className="text-base md:text-xl font-display uppercase mb-4">
                  {content.mission.title}
                </h2>
              </FadeIn>
              <FadeIn initialDelay={0.3} once>
                <p className="text-2xl md:text-3xl lg:text-[27px]">
                  {content.mission.content}
                </p>
              </FadeIn>
            </div>
          </div>
          <FadeIn direction="down" once>
            <div className="w-full lg:h-full relative lg:col-start-2 lg:col-span-1">
              {/* <Image
                src={visionCollage.default.src}
                alt="TCCo. - connecting people photo"
                layout="fill"
                objectFit="contain"
              /> */}
              <VideoPlayer
                thumbnailSrc={visionCollage.default.src}
                videoSrc={VIDEO_SOURCE}
                aspectRatio="1/1"
              />
            </div>
          </FadeIn>
        </section>

        {/* Mission Section */}
        {/* <section className="py-20 lg:px-20 text-center">
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
        </section> */}

        {/* Brands Section */}
        {/* <section className="pt-28 pb-20">
          <div className="container md:px-20">
            <div className="flex flex-wrap justify-center gap-8">
              {content.brands.items.map((item: any, index: number) => {
                if (index >= 2) return;
                return (
                  <FadeIn
                    key={`${index}-brand-card`}
                    direction="left"
                    initialDelay={(index + 1) * 0.05}
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
        </section> */}

        {/* Featured Businesses Section */}
        <section className="pt-20 pb-12 lg:px-20">
          <div className="container mx-auto">
            <FadeIn initialDelay={0.1} once>
              <h2 className="text-base md:text-xl font-display uppercase mb-8 text-center">
                Featured Businesses
              </h2>
            </FadeIn>

            <FeaturedBusinesses />

            <div className="flex justify-center mt-8">
              <FadeIn initialDelay={0.3} once>
                <Button size="lg" asChild>
                  <Link href={"/discover?browse=all"}>
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
        <section className=" mx-auto lg:px-20 mb-20">
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
        {/* <div className="hidden lg:block">
          <MessageTicker message="Thriving Communities Inspire Growth" />
        </div> */}
      </main>
      <Footer />
    </>
  );
}

function FeaturedBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedBusinesses() {
      try {
        // Fetch featured businesses
        const businessesRef = collection(firestore, BUSINESS_COLLECTION);
        const q = query(businessesRef, where("featured", "==", true));
        const snapshot = await getDocs(q);

        // Get all businesses first
        const businessDocs = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Business)
        );

        // Get unique location IDs
        const locationIds = Array.from(
          new Set(
            businessDocs
              .map((doc) =>
                typeof doc.locationId === "object"
                  ? doc.locationId.id
                  : doc.locationId
              )
              .filter(Boolean)
          )
        );

        // Fetch locations in one batch
        const locationsRef = collection(firestore, LOCATIONS_COLLECTION);
        const locationsSnapshot = await getDocs(locationsRef);
        const locationsMap = new Map(
          locationsSnapshot.docs.map((doc) => [doc.id, doc.data().name])
        );

        // Map businesses with location names
        const featuredBusinesses = businessDocs
          .map((business) => {
            const locationId =
              typeof business.locationId === "object"
                ? business.locationId.id
                : business.locationId;

            return {
              ...business,
              location: locationsMap.get(locationId) || "No Location",
            } as Business;
          })
          .slice(0, 3); // Limit to 3 businesses

        setBusinesses(featuredBusinesses);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedBusinesses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No featured businesses found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {businesses.map((business) => (
        <Card
          key={business.id}
          className="flex flex-col md:flex-row h-full w-full overflow-hidden border-muted bg-background shadow-custom-rem rounded-sm"
        >
          {/* Image Section */}
          <div className="w-full h-full md:mb-0 md:w-2/5 relative">
            <Image
              src={business.image}
              alt={business.name}
              layout="fill"
              objectFit="cover"
              className="rounded-l-sm"
            />
            {/* {result.featured && (
                          <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-sm font-medium">
                            Featured
                          </span>
                        )} */}
          </div>

          {/* Content Section */}
          <div className="w-full md:w-3/5 p-6 flex flex-col">
            {/* Title and Verified Badge */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-display">{business.name}</h2>
              {business.verified && (
                <span className="flex items-center gap-1 text-primary">
                  <VerifiedIcon />
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              {business.location ? String(business.location) : "No Location"}
            </div>

            {/* Views Count */}
            <div className="flex items-center gap-2 text-primary mb-4">
              <ViewsIcon />
              {business.views} views
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-auto">
              {/* <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => {
                  // setSelectedBusiness(result);
                  // setIsContactModalOpen(true);
                }}
              >
                Contact
              </Button> */}
              <Button
                size="sm"
                variant="ghost"
                className=" bg-backgrdound border border-muted hover:border-primary hover:bg-background"
                asChild
              >
                <Link href={`/discover/${business.slug}`} target="_blank">
                  <span className="hidden md:block text-muted-foreground text-xs mr-3">
                    Learn More{" "}
                  </span>
                  <ViewBusinessIcon />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
