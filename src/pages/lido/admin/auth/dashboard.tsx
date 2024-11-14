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
import { collection, getDocs } from "firebase/firestore";
import { firestore, BUSINESS_COLLECTION } from "@/lib/firebase";
import Head from "next/head";

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not admin
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Fetch businesses from Firestore
    const fetchBusinesses = async () => {
      const businessesRef = collection(firestore, BUSINESS_COLLECTION);
      const snapshot = await getDocs(businessesRef);
      const businessList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Business[];
      setBusinesses(businessList);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && businesses.length === 0) {
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
              console.log("Opening modal...");
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
                console.log("Opening modal...");
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
            console.log("Modal state changing to:", open);
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
            console.log("Opening modal...");
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
                <TableCell>{business.category}</TableCell>
                <TableCell>{business.location}</TableCell>
                <TableCell>{business.views}</TableCell>
                <TableCell>
                  {business.verified ? (
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
          console.log("Modal state changing to:", open);
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
