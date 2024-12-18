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

export default function DirectoryDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const businessesRef = collection(firestore, BUSINESS_COLLECTION);
        const q = query(businessesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Business not found");
          return;
        }

        const businessDoc = querySnapshot.docs[0];
        const businessData = businessDoc.data() as Business;

        // Check if user has visited this business before
        const visitedKey = `visited_${businessDoc.id}`;
        const visitedData = localStorage.getItem(visitedKey);
        const now = Date.now();
        const EXPIRY_DAYS = 1; // Configure how many days until it expires

        const hasValidVisit =
          visitedData && JSON.parse(visitedData).expiry > now;

        if (!hasValidVisit) {
          // Increment views for new or expired visits
          await updateDoc(doc(firestore, BUSINESS_COLLECTION, businessDoc.id), {
            views: increment(1),
          });

          // Store visit with expiration
          localStorage.setItem(
            visitedKey,
            JSON.stringify({
              visited: true,
              expiry: now + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
            })
          );

          setBusiness({
            ...businessData,
            views: (businessData.views || 0) + 1,
          });
        } else {
          setBusiness(businessData);
        }
      } catch (err) {
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
                {business.views} views
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
