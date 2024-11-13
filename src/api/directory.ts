export interface BusinessHour {
  day: string;
  hours: string;
}

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
  phone: string;
  website: string;
  verified: boolean;
  socials?: Social[];
}

export interface Social {
  name: string;
  url: string;
}

export async function fetchDirectoryDetails(
  slug: string
): Promise<Business | null> {
  const response = await fetch(`/api/directory/${slug}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch directory details");
  }

  const data = await response.json();
  return data;
}
