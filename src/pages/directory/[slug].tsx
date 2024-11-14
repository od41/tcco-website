import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Business, fetchDirectoryDetails } from "@/api/directory"; // Assuming this exists
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a spinner component
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { VerifiedIcon, ViewsIcon } from "@/components/ui/icons";
import { getIconForSocialMedia } from "@/content/footer";
import { Biz, ContactModal } from "@/components/contact-modal";

const DirectoryDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // create some dummy so that i can test the u
  const directory: Business = {
    id: "1",
    slug: slug as string,
    views: 100,
    name: "The Coffee House",
    category: "Café & Restaurant",
    location: "Ikeja, Lagos",
    email: "thecoffeehouse@example.com",
    phone: "(555) 123-4567",
    website: "https://example.com",
    verified: true,
    description:
      "A cozy coffee shop in the heart of downtown, serving artisanal coffee, fresh pastries, and light meals. Our beans are sourced from local roasters and we pride ourselves on our friendly service and welcoming atmosphere.",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2947&auto=format&fit=crop",
    address: "123 Main Street, Downtown, City, 12345",
    socials: [
      { name: "Facebook", url: "https://facebook.com" },
      { name: "Instagram", url: "https://instagram.com" },
      { name: "X", url: "https://twitter.com" },
      { name: "LinkedIn", url: "https://linkedin.com" },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="text-gray-600">Please try again later</p>
        <button
          onClick={() => router.reload()}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  // if (!directory) {
  if (false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-display">Business Not Found</h1>
        <p className="text-gray-300">
          The business you&apos;re looking for doesn&apos;t exist
        </p>
        <Button size="lg" asChild>
          <Link href={"/directory"}>Back to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:px-20 px-4 py-8 mt-20">
      <div className=" border border-none md:border-primary/10 rounded-md p-0 md:p-10">
        <Card className="flex flex-col md:flex-row md:items-center h-full w-full overflow-hidden bg-background border-background shadow-custom-rem rounded-sm">
          {/* Image Section */}
          <div className="flex items-center justify-start gap-4 mb-6 md:mb-0 w-full">
            <div className="min-w-[60px] md:min-w-[100px] h-[60px] md:h-[100px] relative">
              <Image
                src={directory.image}
                alt={directory.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              {/* {directory.featured && (
                      <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-sm font-medium">
                        Featured
                      </span>
                        )} */}
            </div>
            <div className="flex flex-col">
              {/* Title and Verified Badge */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-display">{directory.name}</h2>
                {directory.verified && (
                  <span className="flex items-center gap-1 ml-3 text-primary">
                    <VerifiedIcon />
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                {directory.location}
              </div>

              {/* Views Count */}
              <div className="flex items-center gap-2 text-primary">
                <ViewsIcon />
                {directory.views} views
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:ml-6 flex justify-between items-center gap-4">
            {/* Buttons */}
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => {
                setIsContactModalOpen(true);
              }}
            >
              Contact
            </Button>
          </div>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-display text-primary">About</h3>
          <p className="text-white mt-3">{directory.description}</p>
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="mt-6 w-full md:w-1/2">
            <h3 className="text-lg font-display text-primary">
              Company Website
            </h3>
            <p className="text-white mt-3">{directory.website}</p>
          </div>

          <div className="mt-6 w-full md:w-1/2">
            <h3 className="text-lg font-display text-primary">Social Media</h3>
            <div className="flex space-x-6 mt-3">
              {directory.socials &&
                directory.socials.map((link: any, index: number) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {getIconForSocialMedia(link.name)}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ContactModal
        business={directory}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default DirectoryDetailsPage;
