export interface Business {
  id: string;
  slug: string;
  name: string;
  views: number;
  email: string;
  category: string;
  description: string;
  image: string;
  address?: string;
  location: string;
  name_lower: string; // lowercase version of the name for searching
  locationId: string;
  phone: string;
  website: string;
  verified: boolean;
  socials?: Social[];
  locationKeywords?: string[];
  nameKeywords?: string[];
}

export interface Social {
  name: string;
  url: string;
}
