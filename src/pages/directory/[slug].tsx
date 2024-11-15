import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Business } from "@/api/directory";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { VerifiedIcon, ViewsIcon } from "@/components/ui/icons";
import { getIconForSocialMedia } from "@/content/footer";
import { Biz, ContactModal } from "@/components/contact-modal";
import Head from "next/head";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore, BUSINESS_COLLECTION } from "@/lib/firebase";

export default function DirectoryDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusiness() {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        // Query the business by slug
        const businessesRef = collection(firestore, BUSINESS_COLLECTION);
        const q = query(businessesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Business not found");
          return;
        }

        const businessDoc = querySnapshot.docs[0];
        const businessData = businessDoc.data() as Business;

        // Increment views
        await updateDoc(doc(firestore, BUSINESS_COLLECTION, businessDoc.id), {
          views: increment(1),
        });

        setBusiness({
          ...businessData,
          views: (businessData.views || 0) + 1, // Update local state with incremented views
        });
      } catch (err) {
        console.error("Error fetching business:", err);
        setError("Failed to load business details");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBusiness();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Head>
          <title>Loading... | TCCo. - Connecting SMB Communities</title>
        </Head>
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Head>
          <title>Error | TCCo. - Connecting SMB Communities</title>
        </Head>
        <h1 className="text-2xl font-display text-white">
          {error || "Business not found"}
        </h1>
        <p className="text-gray-200">
          {error
            ? "Please try again later"
            : "The business you're looking for doesn't exist"}
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/directory">Back to Directory</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:px-20 px-4 py-8 mt-20">
      <Head>
        <title>{business.name} | TCCo. - Connecting SMB Communities</title>
      </Head>

      {/* Rest of your existing JSX using the business data */}
      <div className="border border-none md:border-primary/10 rounded-md p-0 md:p-10">
        <Card className="flex flex-col md:flex-row md:items-center h-full w-full overflow-hidden bg-background border-background shadow-custom-rem rounded-sm">
          {/* Image Section */}
          <div className="flex items-center justify-start gap-4 mb-6 md:mb-0 w-full">
            <div className="min-w-[60px] md:min-w-[100px] h-[60px] md:h-[100px] relative">
              <Image
                src={business.image}
                alt={business.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              {/* Title and Verified Badge */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-display">{business.name}</h2>
                {business.verified && (
                  <span className="flex items-center gap-1 ml-3 text-primary">
                    <VerifiedIcon />
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                {business.location}
              </div>

              {/* Views Count */}
              <div className="flex items-center gap-2 text-primary">
                <ViewsIcon />
                {business.views} views
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
          <p className="text-white mt-3">{business.description}</p>
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="mt-6 w-full md:w-1/2">
            <h3 className="text-lg font-display text-primary">
              Company Website
            </h3>
            <p className="text-white mt-3">{business.website}</p>
          </div>

          <div className="mt-6 w-full md:w-1/2">
            <h3 className="text-lg font-display text-primary">Social Media</h3>
            <div className="flex space-x-6 mt-3">
              {business.socials &&
                business.socials.map((link: any, index: number) => (
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
        business={business}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
