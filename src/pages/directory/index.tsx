import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  ArtIcon,
  HealthIcon,
  AutoIcon,
  BeautyIcon,
  FoodIcon,
  LifestyleIcon,
  TechIcon,
  TravelIcon,
  EventsIcon,
  GridViewIcon,
  ListViewIcon,
  VerifiedIcon,
  ViewsIcon,
  ViewBusinessIcon,
} from "@/components/ui/icons";
import { ContactModal } from "@/components/contact-modal";
import { Business } from "@/api/directory";
import { Biz } from "@/components/contact-modal";

const schema = Yup.object().shape({
  location: Yup.string(),
  businessName: Yup.string(),
});

const DirectoryPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<
    Biz | Business | null
  >(null);

  const categories = [
    { title: "Art & Design", listings: 3, icon: <ArtIcon /> },
    { title: "Auto Services", listings: 8, icon: <AutoIcon /> },
    { title: "Food & Beverages", listings: 11, icon: <FoodIcon /> },
    { title: "Lifestyle Products", listings: 4, icon: <LifestyleIcon /> },
    { title: "Travel Logistics", listings: 10, icon: <TravelIcon /> },
    { title: "Beauty & Fashion", listings: 9, icon: <BeautyIcon /> },
    { title: "Media & Tech", listings: 35, icon: <TechIcon /> },
    { title: "Health & Environment", listings: 28, icon: <HealthIcon /> },
    { title: "Events & Entertainment", listings: 401, icon: <EventsIcon /> },
  ];

  const searchResults: Business[] = [
    {
      id: "1",
      name: "The Coffee House",
      slug: "the-coffee-house",
      category: "Food & Beverages",
      phone: "08012345678",
      email: "thecoffeehouse@example.com",
      website: "https://www.thecoffeehouse.com",
      views: 20,
      image:
        "https://images.unsplash.com/photo-1720048170970-3848514c3d60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "123 Main St, City",
      description: "Artisanal coffee shop serving specialty brews and pastries",
      verified: true,
    },
    {
      id: "2",
      slug: "the-coffee-house",
      name: "The Coffee House",
      phone: "08012345678",
      email: "thecoffeehouse@example.com",
      website: "https://www.thecoffeehouse.com",
      category: "Food & Beverages",
      views: 20,
      image:
        "https://images.unsplash.com/photo-1720048170970-3848514c3d60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "123 Main St, City",
      description: "Artisanal coffee shop serving specialty brews and pastries",
      verified: true,
    },
    {
      id: "3",
      slug: "the-coffee-house",
      name: "The Coffee House",
      phone: "08012345678",
      email: "thecoffeehouse@example.com",
      website: "https://www.thecoffeehouse.com",
      category: "Food & Beverages",
      views: 20,
      image:
        "https://images.unsplash.com/photo-1720048170970-3848514c3d60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "123 Main St, City",
      description: "Artisanal coffee shop serving specialty brews and pastries",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[650px] md:h-[500px] bg-black/50 pt-[240px]">
        <Image
          src="/directory-hero.jpg"
          alt="Directory background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <h1 className="mb-8 text-center text-5xl font-display">
            <span className="text-primary">DISCOVER</span> COMMUNITY,
            <br />
            TRUST SIMPLIFIED
          </h1>

          <div className="flex w-full max-w-4xl flex-col items-end gap-4 px-4 md:flex-row">
            <div className="flex-1">
              <label
                htmlFor="location"
                className="block mb-1 text-sm text-white"
              >
                Search a Location near you
              </label>
              <input
                type="text"
                id="location"
                placeholder="Location e.g Lagos"
                {...register("location")}
                className="w-full px-3 py-2 bg-background/40 border border-[#F8F9F5] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="businessName"
                className="block mb-1 text-sm text-white"
              >
                Search by Business or Service
              </label>
              <input
                type="text"
                id="businessName"
                placeholder="Business name e.g TC Co."
                {...register("businessName")}
                className="w-full px-3 bg-background/40 py-2 border border-[#F8F9F5] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.businessName.message}
                </p>
              )}
            </div>
            <Button className=" md:w-auto h-[42px]">Explore Now →</Button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mx-auto lg:px-20 px-4 py-16">
        <h2 className="mb-8 text-center text-4xl font-display">
          Browse by Category
        </h2>
        <p className="mb-12 text-center">
          Find the best businesses near you in just a few clicks. Whether
          you&apos;re searching for restaurants, services, or shops, our curated
          listings connect you to trusted local providers. Explore reviews,
          special offers, and essential details to make informed choices. Your
          next favorite spot is just a search away
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex items-center border border-primary gap-4 rounded-lg bg-black text-white hover:bg-black/90"
            >
              <div className="flex h-full w-[80px] items-center justify-center rounded-l-lg bg-primary text-2xl text-black">
                <div className="flex items-center justify-center w-[30px] h-[30px]">
                  {category.icon}
                </div>
              </div>
              <div className="p-4 pl-0">
                <h3 className="text-xl font-display">{category.title}</h3>
                <p className="text-sm text-gray-400">
                  {category.listings} Listings
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Results Section */}
        <div className="mt-12 md:mt-28">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-gray-600">
                {searchResults.length} businesses found
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <select className="rounded-md border p-2">
                <option>Sort by: Featured</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
              </select>

              <div className="flex rounded-full border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <GridViewIcon />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <ListViewIcon />
                </Button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  className="flex flex-col md:flex-row h-full w-full overflow-hidden border-primary bg-background shadow-custom-rem rounded-sm"
                >
                  {/* Image Section */}
                  <div className="w-full h-full md:mb-0 md:w-2/5 relative">
                    <Image
                      src={result.image}
                      alt={result.name}
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
                      <h2 className="text-xl font-display">{result.name}</h2>
                      {result.verified && (
                        <span className="flex items-center gap-1 text-primary">
                          <VerifiedIcon />
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      {result.location}
                    </div>

                    {/* Views Count */}
                    <div className="flex items-center gap-2 text-primary mb-4">
                      <ViewsIcon />
                      {result.views} views
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => {
                          setSelectedBusiness(result);
                          setIsContactModalOpen(true);
                        }}
                      >
                        Contact
                      </Button>
                      <Button
                        size="icon"
                        className="aspect-square bg-black border border-black hover:border-primary hover:bg-black"
                        asChild
                      >
                        <Link href={`/directory/${result.id}`}>
                          <ViewBusinessIcon />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8 md:space-y-12">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  className="flex flex-col md:flex-row md:items-center h-full w-full overflow-hidden bg-background border-background shadow-custom-rem rounded-sm"
                >
                  {/* Image Section */}
                  <div className="flex items-center justify-start gap-4 mb-6 md:mb-0 w-full">
                    <div className="min-w-[60px] md:min-w-[100px] h-[60px] md:h-[100px] relative">
                      <Image
                        src={result.image}
                        alt={result.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                      {/* {result.featured && (
                      <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-sm font-medium">
                        Featured
                      </span>
                        )} */}
                    </div>
                    <div className="flex flex-col">
                      {/* Title and Verified Badge */}
                      <div className="flex items-center justify-between mb-2 md:mb-4">
                        <h2 className="text-xl font-display">{result.name}</h2>
                        {result.verified && (
                          <span className="flex items-center gap-1 ml-3 text-primary">
                            <VerifiedIcon />
                          </span>
                        )}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-gray-600 mb-2 md:mb-4">
                        {result.location}
                      </div>

                      {/* Views Count */}
                      <div className="flex items-center gap-2 text-primary">
                        <ViewsIcon />
                        {result.views} views
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
                        setSelectedBusiness(result);
                        setIsContactModalOpen(true);
                      }}
                    >
                      Contact
                    </Button>
                    <Button
                      size="icon"
                      className="aspect-square bg-black border border-black hover:border-primary hover:bg-black"
                      asChild
                    >
                      <Link href={`/directory/${result.id}`}>
                        <ViewBusinessIcon />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer isMini={true} />
      <ContactModal
        business={selectedBusiness}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default DirectoryPage;
