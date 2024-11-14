import React, { useState, useEffect } from "react";
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
import Head from "next/head";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore, BUSINESS_COLLECTION } from "@/lib/firebase";
import { Spinner } from "@/components/ui/spinner";

const schema = Yup.object().shape({
  location: Yup.string(),
  businessName: Yup.string(),
});

const DirectoryPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch form fields for real-time search
  const location = watch("location");
  const businessName = watch("businessName");

  // Fetch businesses by category
  const fetchBusinessesByCategory = async (category: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const q = query(
        collection(firestore, BUSINESS_COLLECTION),
        where("category", "==", category),
        orderBy("views", "desc"),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      const businesses = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Business)
      );

      setSearchResults(businesses);
      setSelectedCategory(category);
    } catch (err) {
      console.error("Error fetching businesses:", err);
      setError("Failed to load businesses");
    } finally {
      setIsLoading(false);
    }
  };

  // Search businesses
  const searchBusinesses = async (data: {
    location?: string;
    businessName?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const collectionRef = collection(firestore, BUSINESS_COLLECTION);
      let searchQuery;

      if (data.location && data.businessName) {
        // Search by both location and business name
        searchQuery = query(
          collectionRef,
          where("location", ">=", data.location),
          where("location", "<=", data.location + "\uf8ff"),
          where("name", ">=", data.businessName),
          where("name", "<=", data.businessName + "\uf8ff"),
          orderBy("views", "desc"),
          limit(20)
        );
      } else if (data.location) {
        // Search by location only
        searchQuery = query(
          collectionRef,
          where("location", ">=", data.location),
          where("location", "<=", data.location + "\uf8ff"),
          orderBy("views", "desc"),
          limit(20)
        );
      } else if (data.businessName) {
        // Search by business name only
        searchQuery = query(
          collectionRef,
          where("name", ">=", data.businessName),
          where("name", "<=", data.businessName + "\uf8ff"),
          orderBy("views", "desc"),
          limit(20)
        );
      } else {
        // No search criteria, just return most viewed
        searchQuery = query(collectionRef, orderBy("views", "desc"), limit(20));
      }

      const querySnapshot = await getDocs(searchQuery);
      const businesses = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Business)
      );

      setSearchResults(businesses);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Error searching businesses:", err);
      setError("Failed to search businesses");
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle search when form values change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (location || businessName) {
        searchBusinesses({ location, businessName });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [location, businessName]);

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

  return (
    <div className="min-h-screen">
      <Head>
        <title>Business Directory | TCCo. - Connecting SMB Communities</title>
      </Head>
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
            <div className="flex-1 w-full">
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

            <div className="flex-1 w-full">
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
            <Button className=" w-full md:w-auto h-[42px]">
              Explore Now →
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto lg:px-20 px-4 py-16">
        {!searchResults.length && !selectedCategory ? (
          // Show categories when no search results
          <>
            <h2 className="mb-8 text-center text-4xl font-display">
              Browse by Category
            </h2>
            <p className="mb-12 text-center w-full max-w-3xl mx-auto">
              Find the best businesses near you in just a few clicks. Whether
              you&apos;re searching for restaurants, services, or shops, our
              curated listings connect you to trusted local providers. Explore
              reviews, special offers, and essential details to make informed
              choices. Your next favorite spot is just a search away
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => fetchBusinessesByCategory(category.title)}
                  className="flex items-center border border-primary gap-4 rounded-lg bg-black text-white hover:bg-black/90"
                >
                  <div className="flex h-full w-[80px] items-center justify-center rounded-l-lg bg-primary text-2xl text-black">
                    <div className="flex items-center justify-center w-[30px] h-[30px]">
                      {category.icon}
                    </div>
                  </div>
                  <div className="p-4 pl-0 text-left">
                    <h3 className="text-xl font-display">{category.title}</h3>
                    <p className="text-sm text-gray-400">
                      {category.listings} Listings
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          // Show search results or category results
          <div className="mt-12 md:mt-28">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory
                    ? `${selectedCategory} Businesses`
                    : "Search Results"}
                </h2>
                <p className="text-gray-600">
                  {searchResults.length} businesses found
                </p>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-4">
                {selectedCategory && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchResults([]);
                    }}
                  >
                    Back to Categories
                  </Button>
                )}
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

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner className="h-8 w-8" />
              </div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">{error}</div>
            ) : // Existing grid/list view code for search results
            viewMode === "grid" ? (
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
                          <h2 className="text-xl font-display">
                            {result.name}
                          </h2>
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
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        business={selectedBusiness}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Footer isMini={true} />
    </div>
  );
};

export default DirectoryPage;
