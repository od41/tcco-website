import { Business } from "@/api/directory";
import Image from "next/image";
import { X, Mail, Phone, Globe, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { CreateBusinessModal } from "./create-business-modal";
import { Button } from "../ui/button";

interface ViewBusinessModalProps {
  business: Business | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBusinessUpdated: (business: Business) => void;
}

export function ViewBusinessModal({
  business,
  open,
  onOpenChange,
  onBusinessUpdated,
}: ViewBusinessModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Reset edit modal state when view modal is closed
  useEffect(() => {
    if (!open) {
      setIsEditModalOpen(false);
    }
  }, [open]);

  if (!open || !business) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Only show view modal backdrop if edit modal is not open */}
        {!isEditModalOpen && (
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
        )}

        {/* Only show view modal content if edit modal is not open */}
        {!isEditModalOpen && (
          <div className="relative z-50 w-full max-w-3xl rounded-lg border border-gray-300 bg-background p-6 shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={business.image}
                  alt={business.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">{business.name}</h2>
                    {business.verified && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{business.category}</p>
                </div>

                {/* Stats */}
                <div className="rounded-md bg-background border border-gray-600 p-3">
                  <p className="text-sm text-gray-300">
                    Total Views:{" "}
                    <span className="font-medium">{business.views}</span>
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{business.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${business.email}`}
                      className="hover:text-blue-500"
                    >
                      {business.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Phone className="h-4 w-4" />
                    <a
                      href={`tel:${business.phone}`}
                      className="hover:text-blue-500"
                    >
                      {business.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Globe className="h-4 w-4" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500"
                    >
                      {business.website}
                    </a>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-semibold">About</h3>
                  <p className="text-sm text-gray-300">{business.description}</p>
                </div>

                {/* Social Links */}
                {business.socials && business.socials.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Social Media</h3>
                    <div className="flex gap-2">
                      {business.socials.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-gray-50 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      // Add delete functionality
                      console.log("Delete", business.id);
                    }}
                    className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <CreateBusinessModal
        mode="edit"
        editBusiness={business}
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          // If edit modal is closed, also close the view modal
          if (!open) {
            onOpenChange(false);
          }
        }}
        onBusinessUpdated={(updatedBusiness) => {
          onBusinessUpdated(updatedBusiness);
          setIsEditModalOpen(false);
          onOpenChange(false);
        }}
      />
    </>
  );
}
