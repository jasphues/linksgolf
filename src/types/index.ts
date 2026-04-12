export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";
export type Availability = "easy" | "moderate" | "difficult" | "very-difficult";
export type Continent = "europe" | "north-america" | "oceania" | "asia" | "africa" | "south-america";

export interface Hotel {
  name: string;
  stars: 3 | 4 | 5;
  hasWellness: boolean;
  hasSpa: boolean;
  distanceKm: number;
  pricePerNight: { min: number; max: number; currency: string };
  description: string;
  website?: string;
  images?: string[];
}

export interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  onsite: boolean;
  description: string;
  michelinStars?: number;
}

export interface NearestAirport {
  name: string;
  iata: string;
  distanceKm: number;
  transferMinutes: number;
  transferCostEur: number;
}

export interface GolfCourse {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  continent: Continent;
  region: string;
  location: string;
  description: string;
  longDescription: string;
  ranking?: number;
  architects: string[];
  shaper?: string;
  yearBuilt?: number;
  yearRenovated?: number;
  par: number;
  yards: number;
  holes: number;
  difficulty: Difficulty;
  difficultyRating: number;
  greenFee: { min: number; max: number; currency: string };
  availability: Availability;
  bestMonths: string[];
  images: string[];
  heroImage: string;
  videoId?: string;
  droneVideoId?: string;
  website?: string;
  hotels: Hotel[];
  restaurants: Restaurant[];
  features: string[];
  awards: string[];
  hostMajors: string[];
  membershipRequired: boolean;
  guestPolicy: string;
  nearestAirport?: NearestAirport;
  coordinates: { lat: number; lng: number };
}

export interface FinderAnswers {
  numGolfers: number;
  origin: string;
  destination: Continent | "any";
  maxGreenFee: number;
  skillLevel: Difficulty;
  priorities: string[];
  hotelStars: number;
  wantsWellness: boolean;
  travelMonth: string;
  email: string;
  name: string;
}
