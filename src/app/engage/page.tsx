import Image from "next/image";
import { Button } from "@/components/ui/button";
import content from "@/data/engage.content.json";

const heroPhoto = require("@/assets/engage-photo.jpg");
const videoThumbnailPhoto = require("@/assets/video-thumb.jpg");
const visionCollage = require("@/assets/vision-collage.png");

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
