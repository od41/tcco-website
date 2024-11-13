import Image from "next/image";
import { Mail as MailIcon, Phone as PhoneIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VerifiedIcon } from "@/components/ui/icons";
import { Business as GlobalBusiness } from "@/api/directory";

export type Biz = Pick<
  GlobalBusiness,
  "id" | "name" | "image" | "email" | "phone" | "verified"
>;

interface ContactModalProps {
  business: Biz | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ business, isOpen, onClose }: ContactModalProps) {
  if (!business) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            Contact {business.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={business.image}
              alt={business.name}
              fill
              className="rounded-md object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg">{business.name}</h3>
              {business.verified && (
                <span className="flex items-center gap-1 text-primary">
                  <VerifiedIcon />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MailIcon className="h-4 w-4" />
              <a
                href={`mailto:${business.email}`}
                className="hover:text-primary"
              >
                {business.email}
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4" />
              <a href={`tel:${business.phone}`} className="hover:text-primary">
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
