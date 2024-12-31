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
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore, BUSINESS_COLLECTION } from "@/lib/firebase";
import { Share } from "lucide-react";
import { GetStaticProps, GetStaticPaths } from "next";

// Add type for the page props
interface DirectoryDetailsPageProps {
  business: Business | null;
  error?: string;
}

export default function DirectoryDetailsPage({
  business,
  error,
}: DirectoryDetailsPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [localViews, setLocalViews] = useState(business?.views || 0);

  useEffect(() => {
    // Handle view counting on client side
    async function incrementViews() {
      if (!business) return;

      const visitedKey = `visited_${business.id}`;
      const visitedData = localStorage.getItem(visitedKey);
      const now = Date.now();
      const EXPIRY_DAYS = 1;

      const hasValidVisit = visitedData && JSON.parse(visitedData).expiry > now;

      if (!hasValidVisit) {
        try {
          await updateDoc(doc(firestore, BUSINESS_COLLECTION, business.id), {
            views: increment(1),
          });

          localStorage.setItem(
            visitedKey,
            JSON.stringify({
              visited: true,
              expiry: now + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
            })
          );

          setLocalViews((prev) => prev + 1);
        } catch (err) {
          console.error("Failed to increment views:", err);
        }
      }
    }

    incrementViews();
  }, [business]);

  if (error || !business) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
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
            <Link href="/discover">Back to Directory</Link>
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
      <div className="border border-none md:border-primary/10 rounded-md p-0 md:p-10 md:pt-0">
        <div className="min-w-[60px] md:min-w-[100px] h-[240px] md:h-[400px] relative mb-12">
          <Image
            src={business.image}
            alt={business.name}
            layout="fill"
            objectFit="cover"
            className="rounded-sm"
          />
        </div>
        <Card className="flex flex-col md:flex-row md:items-center h-full w-full overflow-hidden bg-background border-background shadow-custom-rem rounded-sm">
          {/* Image Section */}
          <div className="flex items-center justify-start gap-4 mb-6 md:mb-0 w-full">
            {/* <div className="min-w-[60px] md:min-w-[100px] h-[60px] md:h-[100px] relative">
              <Image
                src={business.image}
                alt={business.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div> */}
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
                {localViews} {localViews === 1 ? "view" : "views"}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:ml-6 flex justify-between items-center gap-4">
            {/* Share Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => {
                  // Get current URL
                  const url = window.location.href;
                  // Copy to clipboard
                  navigator.clipboard.writeText(url).then(() => {
                    setShowCopied(true);
                    setTimeout(() => setShowCopied(false), 2000);
                  });
                }}
              >
                {!showCopied && <Share className="w-4 h-4 mr-2" />}
                {showCopied ? "Link copied!" : "Share"}
              </Button>
              {/* {showCopied && (
                <div className="absolute top-11 left-1/2 w-full text-center -translate-x-1/2 bg-white/20 text-gray-200 px-2 py-0.5 text-sm rounded-full">
                  Link copied!
                </div>
              )} */}
            </div>

            {/* Buttons */}
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => {
                setIsContactModalOpen(true);
              }}
            >
              Connect
            </Button>
          </div>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-display text-foreground">About</h3>
          <p className="text-white mt-3 whitespace-pre-line">
            {business.description}
          </p>
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="mt-6 w-full md:w-1/2">
            <h3 className="text-lg font-display text-foreground mb-2">
              Company Website
            </h3>
            <Link
              href={business.website}
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {business.website}
            </Link>
          </div>

          <div className="mt-6 w-full md:w-1/2">
            <h3 className="text-lg font-display text-foreground">
              Social Media
            </h3>
            <div className="flex space-x-6 mt-3">
              {business.socials &&
                business.socials.map((link: any, index: number) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:text-primary"
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

export const getStaticPaths: GetStaticPaths = async () => {
  const businessesRef = collection(firestore, BUSINESS_COLLECTION);
  const snapshot = await getDocs(businessesRef);

  const paths = snapshot.docs.map((doc) => ({
    params: { slug: doc.data().slug },
  }));

  return {
    paths,
    fallback: "blocking", // Show new paths without rebuilding
  };
};

export const getStaticProps: GetStaticProps<
  DirectoryDetailsPageProps
> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const businessesRef = collection(firestore, BUSINESS_COLLECTION);
    const q = query(businessesRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        props: {
          business: null,
          error: "Business not found",
        },
        revalidate: 60,
      };
    }

    const businessDoc = querySnapshot.docs[0];
    const data = businessDoc.data();

    // Serialize the business data, handling any non-serializable fields
    const businessData = {
      id: businessDoc.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      website: data.website,
      location: data.location,
      views: data.views || 0,
      verified: data.verified || false,
      socials: data.socials || [],
      email: data.email,
      address: data.address || "",
      // categoryId: data.categoryId,
      // locationId: data.locationId,
      phone: data.phone,
      featured: data.featured,
    } as Business;

    return {
      props: {
        business: businessData,
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: {
        business: null,
        error: "Failed to load business details",
      },
      revalidate: 60,
    };
  }
};
