import Image from "next/image";
import { Button } from "@/components/ui/button";
import content from "@/data/home.content.json";
import { nl2br } from "@/content";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { VideoPlayer } from "@/components/ui/video-player";

import { MessageTicker } from "@/components/ui/message-ticker";
import { BrandCard } from "@/components/ui/brand-card";
import Link from "next/link";

const heroPhoto = require("@/assets/hero-photo.jpg");
const videoThumbnailPhoto = require("@/assets/video-thumb.jpg");
const visionCollage = require("@/assets/vision-collage.png");

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center py-12">
        <Image
          src={heroPhoto.default.src}
          alt="TC Co. - connecting african communities photo"
          layout="fill"
          objectFit="cover"
          className="z-0 object-top"
        />
        <div className="z-10 text-white container lg:px-20">
          <h1 className="text-4xl md:text-7xl lg:text-7xl font-display uppercase mb-4">
            {nl2br(content.hero.title)}
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
      <MessageTicker message="Thriving Communities Inspire Growth" />

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

      {/* Collage Section */}
      <section className="pb-20">
        <div className="container md:px-20">
          <div className="flex flex-wrap justify-center gap-8">
            {content.brands.items.map((item: any, index: any) => (
              <BrandCard
                key={`${index}-brand-card`}
                imageUrl={item.imageUrl}
                heading={item.heading}
                subHeading={item.subHeading}
                bodyText={item.bodyText}
                learnMoreLink={item.learnMoreLink}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
