import Image from "next/image";
import { Button } from "@/components/ui/button";
import content from "@/data/engage.content.json";
import homeContent from "@/data/home.content.json";
import { MessageTicker } from "@/components/ui/message-ticker";
import { BrandCard } from "@/components/ui/brand-card";

const heroPhoto = require("@/assets/engage-photo.jpg");
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

export default async function Engage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center py-12">
        <Image
          src={heroPhoto.default.src}
          alt="TC Co. - connecting african communities photo"
          layout="fill"
          objectFit="cover"
          className="z-0 object-center"
        />
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* <h2 className="text-base md:text-3xl font-display uppercase mb-4">
            {content.mission.title}
          </h2> */}
          <p className="text-2xl md:text-3xl lg:text-4xl">
            {content.mission.content}
          </p>
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

      {/* Ticker */}
      <MessageTicker message="Thriving Communities Inspire Growth" />

      {/* Impact numbers */}
      <section className="py-20 lg:px-20">
        <div className="container mx-auto">
          {/* <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2> */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.impactNumbers.items.map((item, index) => (
              <div key={`${index}-impact`} className="text-center p-4">
                <div className="text-[90px] font-display text-white mb-1 leading-none">
                  {item.value}
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
      <MessageTicker message="Thriving Communities Inspire Growth" isReversed={true} />

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
            {homeContent.brands.items.map((item: any, index: number) => (
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

      {/* Collage Section */}
      {/* <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {content.collage.images.map((image: any, index: any) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image}
                  alt={`Collage image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                title
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
