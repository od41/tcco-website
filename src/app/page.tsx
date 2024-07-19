import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getContent } from "@/content";

export default async function Home() {
  const content = await getContent();
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">{content.hero.subtitle}</p>
          <Button size="lg">{content.hero.buttonText}</Button>
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

      {/* Footer Section */}
      <footer className="relative py-16 px-4 md:px-8 text-white">
        <Image
          src="/footer-bg.jpg"
          alt="Footer background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {content.footer.about.title}
            </h3>
            <p>{content.footer.about.content}</p>
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
    </main>
  );
}
