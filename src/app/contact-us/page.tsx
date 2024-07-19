import Image from "next/image";
import { Button } from "@/components/ui/button";
import { nl2br } from "@/content";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { VideoPlayer } from "@/components/ui/video-player";
import ContactForm from "./contact-form";

const heroPhoto = require("@/assets/engage-photo.jpg");
const videoThumbnailPhoto = require("@/assets/video-thumb.jpg");
const visionCollage = require("@/assets/vision-collage.png");

export default async function ContactUs() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center py-12">
        <h1 className="text-3xl font-display mb-8">Contact Us</h1>
        {/* <ContactForm /> */}
      </section>
    </main>
  );
}
