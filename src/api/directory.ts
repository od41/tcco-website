import { DocumentReference } from "firebase/firestore";

export interface Business {
  id: string;
  slug: string;
  name: string;
  name_lower: string; // lowercase version of the name for searching
  views: number;
  email: string;
  description: string;
  image: string;
  address?: string;
  location: string;
  categoryId: string | DocumentReference;
  locationId: string | DocumentReference;
  phone: string;
  website: string;
  verified: boolean;
  featured: boolean;
  socials?: Social[];
}

export interface Social {
  name: string;
  url: string;
}
