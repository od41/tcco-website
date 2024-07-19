import Image from "next/image";
import { Button } from "@/components/ui/button";
import content from "@/data/home.content.json";
import { nl2br } from "@/content";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { VideoPlayer } from "@/components/ui/video-player";

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
          <Button size="lg">
            {content.hero.buttonText} <ArrowRightIcon className="ml-3" />
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

      {/* 2-Column Grid Section */}
      <section className="md:px-8 relative h-[48vw] overflow-hidden flex flex-col lg:flex-row items-center">
        <div className="container lg:px-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-base md:text-3xl font-display uppercase mb-4">
              {content.vision.title}
            </h2>
            <p className="text-2xl md:text-3xl lg:text-5xl mb-4">
              {content.vision.content}
            </p>
          </div>
          <div className="relative aspect-square">
            <Image
              src={visionCollage.default.src}
              alt="TC Co. - connecting people photo"
              layout="fill"
              objectFit="cover"
              className="opacity-0"
            />
          </div>
        </div>
        <img
          src={visionCollage.default.src}
          alt="TC Co. - connecting people photo"
          className="absolute w-1/2 top-0 right-0"
        />
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-base md:text-3xl font-display uppercase mb-4">
            {content.mission.title}
          </h2>
          <p className="text-2xl md:text-3xl lg:text-5xl mb-4">
            {content.mission.content}
          </p>
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
