import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Business } from "@/api/directory";
import { CreateBusinessModal } from "@/components/admin/create-business-modal";
import { ViewBusinessModal } from "@/components/admin/view-business-modal";
import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import {
  firestore,
  BUSINESS_COLLECTION,
  CATEGORIES_COLLECTION,
  LOCATIONS_COLLECTION,
} from "@/lib/firebase";
import Head from "next/head";
import { Spinner } from "@/components/ui/spinner";
import { Location } from "@/components/admin/create-business-modal";

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not admin
    if (!authLoading && !user) {
      router.push("/lido/admin/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // Fetch businesses from Firestore
    const fetchBusinesses = async () => {
      const businessesRef = collection(firestore, BUSINESS_COLLECTION);
      const snapshot = await getDocs(businessesRef);

      // Get unique category IDs
      const categoryIds = Array.from(
        new Set(
          snapshot.docs.map((doc) => doc.data().categoryId).filter(Boolean)
        )
      );

      // Fetch locations
      const locationsRef = collection(firestore, LOCATIONS_COLLECTION);
      const locationsSnapshot = await getDocs(locationsRef);
      const fetchedLocations = locationsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Location))
        .filter((location) => location.isActive);

      // Fetch all categories in one batch
      const categoriesRef = collection(firestore, CATEGORIES_COLLECTION);
      const categoriesSnapshot = await getDocs(
        query(
          categoriesRef,
          where(
            documentId(),
            "in",
            categoryIds.length ? categoryIds : ["dummy-id"]
          )
        )
      );

      // Create categories lookup map
      const categoriesMap = new Map(
        categoriesSnapshot.docs.map((doc) => [doc.id, doc.data().name])
      );

      // Map businesses with category names
      const businessList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const category = data.categoryId
          ? categoriesMap.get(data.categoryId["id"])
          : "No Category";

        // Simplified location lookup
        const locationId =
          typeof data.locationId === "object"
            ? data.locationId.id
            : data.locationId;
        const location = fetchedLocations.find((loc) => loc.id === locationId);

        return {
          id: doc.id,
          ...data,
          categoryId: category,
          location: location?.name || "Unknown Location",
        };
      }) as Business[];

      setBusinesses(businessList);
      setIsLoading(false);
    };

    fetchBusinesses();
  }, []);

  const handleBusinessUpdated = (updatedBusiness: Business) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === updatedBusiness.id ? updatedBusiness : business
      )
    );
  };

  const handleBusinessDeleted = (businessId: string) => {
    setBusinesses((prev) =>
      prev.filter((business) => business.id !== businessId)
    );
    setSelectedBusiness(null); // Close the modal
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Head>
          <title>Loading... | TCCo. - Connecting SMB Communities</title>
        </Head>
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!authLoading && businesses.length === 0) {
    return (
      <div className="container mx-auto py-8 mt-20">
        <Head>
          <title>
            Business Management | TCCo. - Connecting SMB Communities
          </title>
        </Head>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-display">Business Management</h1>
          <Button
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
            className="mt-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Business
          </Button>
        </div>

        <div className="rounded-md border border-dashed p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-gray-100 p-3">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-display">No businesses yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by adding your first business listing
            </p>
            <Button
              onClick={() => {
                setIsCreateModalOpen(true);
              }}
              className="mt-4"
            >
              Add Business
            </Button>
          </div>
        </div>
        <CreateBusinessModal
          open={isCreateModalOpen}
          onOpenChange={(open) => {
            setIsCreateModalOpen(open);
          }}
          onBusinessCreated={(newBusiness) => {
            setBusinesses((prev) => [...prev, newBusiness]);
            setIsCreateModalOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 mt-20">
      <Head>
        <title>Business Management | TCCo. - Connecting SMB Communities</title>
      </Head>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-display">Business Management</h1>
        <Button
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Business
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Featured</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business) => (
              <TableRow
                key={business.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedBusiness(business)}
              >
                <TableCell className="font-medium">{business.name}</TableCell>
                <TableCell>{String(business.categoryId)}</TableCell>
                <TableCell>
                  {business.location ? String(business.location) : "-"}
                </TableCell>
                <TableCell>{business.views}</TableCell>
                <TableCell>
                  {business.verified ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {business.featured ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateBusinessModal
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open);
        }}
        onBusinessCreated={(newBusiness) => {
          setBusinesses((prev) => [...prev, newBusiness]);
          setIsCreateModalOpen(false);
        }}
      />

      <ViewBusinessModal
        business={selectedBusiness}
        open={!!selectedBusiness}
        onOpenChange={() => setSelectedBusiness(null)}
        onBusinessUpdated={handleBusinessUpdated}
        onBusinessDeleted={handleBusinessDeleted}
      />
    </div>
  );
}
