import {
  ArrowRightIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
  Link2Icon,
} from "@radix-ui/react-icons";

import { FacebookIcon } from "lucide-react";

export const getIconForSocialMedia = (name: string) => {
  switch (name.toLowerCase()) {
    case "instagram":
      return (
        <InstagramLogoIcon className="w-6 h-6 text-white hover:text-primary" />
      );
    case "x":
      return (
        <TwitterLogoIcon className="w-6 h-6 text-white hover:text-primary" />
      );
    case "linkedin":
      return (
        <LinkedInLogoIcon className="w-6 h-6 text-white hover:text-primary" />
      );
    case "facebook":
      return (
        <FacebookIcon className="w-6 h-6 text-white hover:text-primary transition-colors duration-200" />
      );
    // Add more cases as needed
    default:
      return (
        <Link2Icon className="w-6 h-6 text-white hover:text-primary transition-colors duration-200" />
      );
  }
};
