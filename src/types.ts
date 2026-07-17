export enum ServiceCategory {
  WEDDING_PHOTO = "Wedding Photography",
  WEDDING_FILM = "Wedding Cinematic Films",
  PRE_WEDDING = "Pre-Wedding & Couple Shoots",
  NEWBORN_FAMILY = "Newborn & Family Photography",
  PORTFOLIO = "Portfolio Photography",
  EVENTS = "Special Events & Celebrations",
}

export interface ServiceDetail {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  features: string[];
  duration: string;
  deliverables: string[];
}

export interface PortfolioItem {
  id: string;
  category: "Weddings" | "Films" | "Pre-Wedding" | "Newborn & Family" | "Portraits" | "Events";
  title: string;
  coupleName?: string;
  location: string;
  mediaType: "image" | "video" | "mixed";
  mediaUrl: string; // generated image URL
  videoEmbedId?: string; // YouTube/Vimeo embed or direct video link placeholder
  aspectRatio: "1:1" | "16:9" | "4:3" | "3:4";
  caption?: string;
  gallery?: Array<{
    type: "image" | "video";
    url: string;
    caption?: string;
  }>;
}

export interface CoreStatistic {
  value: string;
  label: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  location: string;
  quote: string;
  category: string;
}

export interface BookingEnquiry {
  eventType: string;
  date: string;
  location: string;
  guestCount: string;
  services: string[];
  name: string;
  phone: string;
  email: string;
  vision: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  description: string;
  foundedYear: number;
  phone: string;
  email: string;
  whatsappNumber: string;
  instagramUrl: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    mapIframeUrl: string;
  };
  stats: CoreStatistic[];
}
