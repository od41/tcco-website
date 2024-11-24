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
  doc,
} from "firebase/firestore";
import {
  firestore,
  BUSINESS_COLLECTION,
  CATEGORIES_COLLECTION,
} from "@/lib/firebase";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  businessName: Yup.string(),
});

interface Category {
  id: string;
  name: string;
  listings: number;
  isActive: boolean;
}

interface Location {
  id: string;
  name: string;
  isActive: boolean;
}

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case "Art & Design":
      return <ArtIcon />;
    case "Auto Services":
      return <AutoIcon />;
    case "Food & Beverages":
      return <FoodIcon />;
    case "Lifestyle Products":
      return <LifestyleIcon />;
    case "Travel & Logistics":
      return <TravelIcon />;
    case "Beauty & Fashion":
      return <BeautyIcon />;
    case "Media & Tech":
      return <TechIcon />;
    case "Health & Environment":
      return <HealthIcon />;
    case "Events & Entertainment":
      return <EventsIcon />;
    default:
      return null;
  }
};

const DirectoryPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [categories, setCategories] = useState<
    Array<{
      id: string;
      title: string;
      listings: number;
      icon: JSX.Element | null;
    }>
  >([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      location: "kc4EttZ6baf3eeWxq8oY", // uuid of Lagos
      businessName: "",
    },
  });

  // Watch form fields for real-time search
  const location = watch("location");

  // Fetch businesses by category
  const fetchBusinessesByCategory = async (categoryId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Create a reference to the category document
      const categoryRef = doc(firestore, CATEGORIES_COLLECTION, categoryId);

      // Query businesses using the category reference
      const q = query(
        collection(firestore, BUSINESS_COLLECTION),
        where("categoryId", "==", categoryRef),
        orderBy("views", "desc"),
        limit(20)
      );

      const querySnapshot = await getDocs(q);

      // Map the results and handle the category reference
      const businesses = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // If you need to display the category name in the UI
          category:
            categories.find((cat) => cat.id === categoryId)?.title ||
            "Unknown Category",
        } as Business;
      });
      console.log("categoryId", categoryId);

      console.log("querySnapshot", querySnapshot);

      console.log("businesses", businesses);

      setSearchResults(businesses);
      setSelectedCategory({
        id: categoryId,
        name:
          categories.find((cat) => cat.id === categoryId)?.title ||
          "Unknown Category",
      });
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
    if (!data.location && !data.businessName) {
      setError("Please enter a location or business name");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const collectionRef = collection(firestore, BUSINESS_COLLECTION);
      let searchQuery;

      console.log("Search input:", {
        location: data.location,
        businessName: data.businessName,
      });

      // If searching by business name only
      if (data.businessName && !data.location) {
        // Search for businesses where name starts with the search term
        console.log("search by business name", data.businessName);
        const searchTerm = data.businessName.toLowerCase();
        searchQuery = query(
          collectionRef,
          orderBy("nameLower"), // You'll need to add this field to your business documents
          where("nameLower", ">=", searchTerm),
          where("nameLower", "<=", searchTerm + "\uf8ff"),
          limit(20)
        );
      }
      // If searching by location only
      else if (data.location && !data.businessName) {
        console.log("search by location", data.location);
        const locationRef = doc(firestore, "locations", data.location);
        searchQuery = query(
          collectionRef,
          where("locationId", "==", locationRef), // Pass the DocumentReference
          orderBy("views", "desc"),
          limit(20)
        );
      }
      // If searching by both
      else if (data.location && data.businessName) {
        const searchTerm = data.businessName.toLowerCase();
        const locationRef = doc(firestore, "locations", data.location);
        console.log("search by both", data.location, data.businessName);
        searchQuery = query(
          collectionRef,
          where("locationId", "==", locationRef),
          where("nameLower", ">=", searchTerm),
          where("nameLower", "<=", searchTerm + "\uf8ff"),
          limit(20)
        );
      }
      // Default query
      else {
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

      console.log("Found businesses:", businesses);
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
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (location || businessName) {
  //       searchBusinesses({ location, businessName });
  //     }
  //   }, 500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [location, businessName]);

  const fetchCategories = async () => {
    try {
      const categoriesRef = collection(firestore, "categories");
      const snapshot = await getDocs(categoriesRef);

      const fetchedCategories = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Category)
        )
        .filter((category) => category.isActive)
        .map((category) => ({
          id: category.id,
          title: category.name,
          listings: category.listings || 0,
          icon: getCategoryIcon(category.name),
        }));

      console.log("fetchedCategories", fetchedCategories);

      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Optionally set an error state here
    }
  };

  const fetchLocations = async () => {
    setIsLoadingLocations(true);
    try {
      const locationsRef = collection(firestore, "locations");
      const snapshot = await getDocs(locationsRef);

      const fetchedLocations = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Location)
        )
        .filter((location) => location.isActive)
        .sort((a, b) => a.name.localeCompare(b.name));

      setLocations(fetchedLocations);

      // Set default location (Lagos)
      const lagos = fetchedLocations.find((loc) => loc.name === "Lagos");
      if (lagos) {
        setValue("location", lagos.id);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, [setValue]);

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

          <form
            onSubmit={handleSubmit(searchBusinesses)}
            className="flex w-full max-w-4xl flex-col items-end gap-4 px-4 md:flex-row"
          >
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
                disabled={isLoading}
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

            <div className="flex-1 w-full">
              <label
                htmlFor="location"
                className="block mb-1 text-sm text-white"
              >
                Search a Location near you
              </label>
              <Select
                value={location}
                disabled={isLoading || isLoadingLocations}
                onValueChange={(value: string) => {
                  setValue("location", value);
                  // Optionally trigger immediate search
                  // handleSubmit(searchBusinesses)();
                }}
              >
                <SelectTrigger className="w-full px-3 py-5 bg-background/40 border border-[#F8F9F5] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue
                    placeholder={
                      isLoadingLocations
                        ? "Loading locations..."
                        : "Select a location"
                    }
                  >
                    {locations &&
                      location &&
                      locations.find((loc) => loc.id === location)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading || isLoadingLocations}
              className="w-full md:w-auto"
            >
              {isLoading ? <Spinner className="h-4 w-4" /> : "Search"}
            </Button>
          </form>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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
                  key={category.id}
                  onClick={() => fetchBusinessesByCategory(category.id)}
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
          <div className="">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory
                    ? `${selectedCategory.name} Businesses`
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
                          <Link
                            href={`/directory/${result.slug}`}
                            target="_blank"
                          >
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
                        <Link
                          href={`/directory/${result.slug}`}
                          target="_blank"
                        >
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
