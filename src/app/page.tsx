import Image from "next/image";
import { Button } from "@/components/ui/button";
import content from "@/data/content.json";
import { nl2br } from "@/content";
import { ArrowRightIcon } from "@radix-ui/react-icons";
const heroPhoto = require("@/assets/hero-photo.jpg");

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
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

      {/* Video Section */}
      <section className="w-full aspect-video">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src={content.video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {content.vision.title}
          </h2>
          <p className="text-lg text-gray-700">{content.vision.content}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {content.mission.title}
          </h2>
          <p className="text-lg text-gray-700">{content.mission.content}</p>
        </div>
      </section>

      {/* 2-Column Grid Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square">
            <Image
              src={content.grid.image}
              alt="Grid image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{content.grid.title}</h2>
            <p className="text-lg text-gray-700 mb-4">{content.grid.content}</p>
            <Button>{content.grid.buttonText}</Button>
          </div>
        </div>
      </section>

      {/* Collage Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {content.collage.title}
          </h2>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
