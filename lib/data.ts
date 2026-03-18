// Mock data for the music magazine

export const genres = [
  { id: "metal", name: "Metal", color: "metal" },
  { id: "punk", name: "Punk", color: "punk" },
  { id: "emo", name: "Emo", color: "emo" },
  { id: "hardcore", name: "Hardcore", color: "hardcore" },
  { id: "alternative", name: "Alternative", color: "alternative" },
  { id: "rock", name: "Rock", color: "rock" },
  { id: "metalcore", name: "Metalcore", color: "metalcore" },
  { id: "post", name: "Post-Rock", color: "post" },
] as const;

// Country and Places data structure
export const countryPlaces: Record<string, string[]> = {
  "Nepal": ["Kathmandu", "Pokhara", "Butwal", "Biratnagar", "Lalitpur", "Bharatpur"],
  "USA": ["Los Angeles", "New York", "Boston", "San Diego", "Michigan", "Chicago"],
  "UK": ["London", "Manchester", "Liverpool", "Leeds", "Castle Donington", "Birmingham"],
  "Canada": ["Hamilton", "Toronto", "Vancouver", "Montreal"],
  "France": ["Paris", "Clisson", "Lyon", "Marseille"],
  "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt"],
};

export const countries = Object.keys(countryPlaces);

export type Genre = (typeof genres)[number]["id"];

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  genre: Genre;
  type: "news" | "interview" | "review";
  featured?: boolean;
  breaking?: boolean;
  sponsored?: boolean;
  rating?: number;
  band?: string;
  label?: string;
}

export interface Band {
  id: string;
  name: string;
  genre: Genre;
  country: string;
  image: string;
  bio: string;
  spotify?: string;
  youtube?: string;
  bandcamp?: string;
  website?: string;
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "METALLICA ANNOUNCES MASSIVE 2025 WORLD TOUR",
    excerpt: "The legendary thrash metal band reveals dates across 50 cities worldwide, promising their biggest production yet.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop",
    author: "Jake Morrison",
    date: "2025-01-02",
    genre: "metal",
    type: "news",
    featured: true,
    breaking: true,
    band: "Metallica",
  },
  {
    id: "2",
    title: "EXCLUSIVE: ARCHITECTS ON THEIR DARKEST ALBUM YET",
    excerpt: "The British metalcore titans open up about grief, growth, and their groundbreaking new sound.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop",
    author: "Sarah Chen",
    date: "2025-01-01",
    genre: "metalcore",
    type: "interview",
    featured: true,
    band: "Architects",
  },
  {
    id: "3",
    title: "ALBUM REVIEW: SPIRITBOX - 'ETERNAL BLUE' DELUXE",
    excerpt: "The Canadian outfit delivers an expanded vision of their debut that demands attention.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop",
    author: "Marcus Hall",
    date: "2024-12-30",
    genre: "metalcore",
    type: "review",
    rating: 9,
    band: "Spiritbox",
    label: "Rise Records",
  },
  {
    id: "4",
    title: "GREEN DAY RETURNS TO PUNK ROOTS WITH SURPRISE EP",
    excerpt: "The pop-punk legends drop a raw, unfiltered collection that harkens back to Dookie-era energy.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=800&fit=crop",
    author: "Alex Rivera",
    date: "2024-12-29",
    genre: "punk",
    type: "news",
    band: "Green Day",
  },
  {
    id: "5",
    title: "MY CHEMICAL ROMANCE: THE REUNION THAT SAVED A GENERATION",
    excerpt: "Looking back at how MCR's return brought hope to millions of fans worldwide.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&h=800&fit=crop",
    author: "Emma Black",
    date: "2024-12-28",
    genre: "emo",
    type: "interview",
    band: "My Chemical Romance",
  },
  {
    id: "6",
    title: "KNOCKED LOOSE SHATTERS EXPECTATIONS WITH 'YOU WON'T GO BEFORE YOU'RE SUPPOSED TO'",
    excerpt: "The Kentucky hardcore outfit delivers a devastating follow-up that pushes boundaries.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop",
    author: "Tyler Woods",
    date: "2024-12-27",
    genre: "hardcore",
    type: "review",
    rating: 10,
    band: "Knocked Loose",
    label: "Pure Noise Records",
  },
  {
    id: "7",
    title: "BRING ME THE HORIZON TEASES EXPERIMENTAL NEW DIRECTION",
    excerpt: "Oli Sykes hints at the band's most ambitious project to date in cryptic social media posts.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=800&fit=crop",
    author: "Jake Morrison",
    date: "2024-12-26",
    genre: "alternative",
    type: "news",
    band: "Bring Me The Horizon",
  },
  {
    id: "8",
    title: "RISE RECORDS SIGNS BREAKOUT ACT FROM SOUTHEAST ASIA",
    excerpt: "Indonesian metalcore band Burgerkill joins major label roster in historic deal.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&h=800&fit=crop",
    author: "Sarah Chen",
    date: "2024-12-25",
    genre: "metalcore",
    type: "news",
    sponsored: true,
    band: "Burgerkill",
    label: "Rise Records",
  },
  {
    id: "9",
    title: "THE STATE OF UNDERGROUND METAL IN 2025",
    excerpt: "A deep dive into the thriving independent metal scene and the bands you need to know.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=800&fit=crop",
    author: "Marcus Hall",
    date: "2024-12-24",
    genre: "metal",
    type: "news",
    featured: true,
  },
  {
    id: "10",
    title: "SLIPKNOT'S COREY TAYLOR ON LEGACY AND THE FUTURE",
    excerpt: "The masked frontman reflects on 25 years of chaos and what comes next.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=800&fit=crop",
    author: "Emma Black",
    date: "2024-12-23",
    genre: "metal",
    type: "interview",
    band: "Slipknot",
  },
  {
    id: "11",
    title: "TOUCHÉ AMORÉ'S JEREMY BOLM ON VULNERABILITY IN HARDCORE",
    excerpt: "The post-hardcore vocalist discusses breaking emotional barriers in heavy music.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=1200&h=800&fit=crop",
    author: "Tyler Woods",
    date: "2024-12-22",
    genre: "post",
    type: "interview",
    band: "Touché Amoré",
  },
  {
    id: "12",
    title: "ALBUM REVIEW: TURNSTILE - 'GLOW ON' TWO YEARS LATER",
    excerpt: "Revisiting the album that brought hardcore to the mainstream.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1200&h=800&fit=crop",
    author: "Alex Rivera",
    date: "2024-12-21",
    genre: "hardcore",
    type: "review",
    rating: 10,
    band: "Turnstile",
    label: "Roadrunner Records",
  },
];

export interface PromotedBand {
  id: string;
  name: string;
  genre: Genre;
  country: string;
  city: string;
  image: string;
  bio: string;
  featured?: boolean;
  spotify?: string;
  youtube?: string;
  bandcamp?: string;
  website?: string;
}

export interface PromotedLabel {
  id: string;
  name: string;
  genres: Genre[];
  country: string;
  image: string;
  description: string;
  featured?: boolean;
  website?: string;
}

export interface PromotedEvent {
  id: string;
  name: string;
  date: string;
  city: string;
  country: string;
  venue: string;
  image: string;
  description: string;
  genres: Genre[];
  featured?: boolean;
  ticketUrl?: string;
}

export interface PromotedJammingHall {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  image: string;
  description: string;
  genres: Genre[];
  featured?: boolean;
  website?: string;
  hourlyRate?: string;
  amenities: string[];
}

export const mockBands: Band[] = [
  {
    id: "1",
    name: "Hollow Front",
    genre: "metalcore",
    country: "USA",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&h=600&fit=crop",
    bio: "Michigan-based metalcore act blending heavy breakdowns with soaring melodies.",
    spotify: "https://open.spotify.com",
    youtube: "https://youtube.com",
  },
  {
    id: "2",
    name: "Employed To Serve",
    genre: "metal",
    country: "UK",
    image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=600&h=600&fit=crop",
    bio: "British metal outfit pushing boundaries with their unique blend of hardcore and metal.",
    spotify: "https://open.spotify.com",
    bandcamp: "https://bandcamp.com",
  },
  {
    id: "3",
    name: "SeeYouSpaceCowboy",
    genre: "hardcore",
    country: "USA",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    bio: "Sasscore revivalists bringing chaotic energy and queer representation to heavy music.",
    spotify: "https://open.spotify.com",
  },
];

export const mockPromotedBands: PromotedBand[] = [
  {
    id: "pb1",
    name: "Hollow Front",
    genre: "metalcore",
    country: "USA",
    city: "Michigan",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&h=600&fit=crop",
    bio: "Michigan-based metalcore act blending heavy breakdowns with soaring melodies and emotional depth.",
    featured: true,
    spotify: "https://open.spotify.com",
    youtube: "https://youtube.com",
  },
  {
    id: "pb2",
    name: "Employed To Serve",
    genre: "metal",
    country: "UK",
    city: "London",
    image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=600&h=600&fit=crop",
    bio: "British metal outfit pushing boundaries with their unique blend of hardcore and metal.",
    featured: true,
    spotify: "https://open.spotify.com",
    bandcamp: "https://bandcamp.com",
  },
  {
    id: "pb3",
    name: "SeeYouSpaceCowboy",
    genre: "hardcore",
    country: "USA",
    city: "San Diego",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    bio: "Sasscore revivalists bringing chaotic energy and queer representation to heavy music.",
    spotify: "https://open.spotify.com",
  },
  {
    id: "pb4",
    name: "Vein.fm",
    genre: "hardcore",
    country: "USA",
    city: "Boston",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    bio: "Brutal, chaotic hardcore with industrial and nu-metal influences that shatter expectations.",
    spotify: "https://open.spotify.com",
  },
  {
    id: "pb5",
    name: "Loathe",
    genre: "metal",
    country: "UK",
    city: "Liverpool",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
    bio: "Atmospheric metal explorers blending shoegaze textures with crushing heaviness.",
    featured: true,
    spotify: "https://open.spotify.com",
  },
  {
    id: "pb6",
    name: "Counterparts",
    genre: "metalcore",
    country: "Canada",
    city: "Hamilton",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=600&fit=crop",
    bio: "Melodic hardcore veterans known for emotionally charged lyrics and relentless touring.",
    spotify: "https://open.spotify.com",
  },
];

export const mockPromotedLabels: PromotedLabel[] = [
  {
    id: "pl1",
    name: "Pure Noise Records",
    genres: ["hardcore", "punk", "metalcore"],
    country: "USA",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    description: "Home to the heaviest and most innovative bands in hardcore and punk.",
    featured: true,
    website: "https://purenoise.com",
  },
  {
    id: "pl2",
    name: "Epitaph Records",
    genres: ["punk", "emo", "alternative"],
    country: "USA",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop",
    description: "Legendary punk and alternative label shaping the scene since 1981.",
    featured: true,
    website: "https://epitaph.com",
  },
  {
    id: "pl3",
    name: "Closed Casket Activities",
    genres: ["hardcore", "metal"],
    country: "USA",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=400&fit=crop",
    description: "Underground hardcore and metal powerhouse with an uncompromising roster.",
    website: "https://closedcasketactivities.com",
  },
  {
    id: "pl4",
    name: "Holy Roar Records",
    genres: ["metal", "post", "hardcore"],
    country: "UK",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    description: "British label championing the heaviest and most experimental sounds.",
    website: "https://holyroar.com",
  },
];

export const mockPromotedEvents: PromotedEvent[] = [
  {
    id: "pe1",
    name: "Outbreak Fest 2025",
    date: "2025-06-27",
    city: "Manchester",
    country: "UK",
    venue: "Bowlers Exhibition Centre",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
    description: "Europe's premier hardcore and heavy music festival returns with a stacked lineup.",
    genres: ["hardcore", "metal", "punk"],
    featured: true,
    ticketUrl: "https://outbreakfest.com",
  },
  {
    id: "pe2",
    name: "Slam Dunk Festival",
    date: "2025-05-24",
    city: "Leeds",
    country: "UK",
    venue: "Temple Newsam",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop",
    description: "The ultimate pop-punk and alternative celebration across two cities.",
    genres: ["punk", "emo", "alternative"],
    featured: true,
    ticketUrl: "https://slamdunkfestival.com",
  },
  {
    id: "pe3",
    name: "Sound and Fury",
    date: "2025-07-12",
    city: "Los Angeles",
    country: "USA",
    venue: "The Wiltern",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop",
    description: "California's legendary hardcore showcase featuring the best of the West Coast scene.",
    genres: ["hardcore", "punk"],
    ticketUrl: "https://soundandfury.com",
  },
  {
    id: "pe4",
    name: "Download Festival",
    date: "2025-06-13",
    city: "Castle Donington",
    country: "UK",
    venue: "Donington Park",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop",
    description: "The world's premier rock and metal festival featuring legendary headliners.",
    genres: ["metal", "rock", "alternative"],
    featured: true,
    ticketUrl: "https://downloadfestival.co.uk",
  },
  {
    id: "pe5",
    name: "Hellfest",
    date: "2025-06-19",
    city: "Clisson",
    country: "France",
    venue: "Val de Moine",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=500&fit=crop",
    description: "Europe's biggest extreme music festival with six stages of pure heaviness.",
    genres: ["metal", "hardcore"],
    ticketUrl: "https://hellfest.fr",
  },
];

export const mockPromotedJammingHalls: PromotedJammingHall[] = [
  {
    id: "pjh1",
    name: "The Riff Room",
    city: "Los Angeles",
    country: "USA",
    address: "1234 Sunset Blvd",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    description: "Premium rehearsal space with top-tier backline and professional acoustics for bands of all genres.",
    genres: ["metal", "rock", "alternative"],
    featured: true,
    website: "https://theriffroom.com",
    hourlyRate: "$35/hr",
    amenities: ["Full PA System", "Drum Kit", "Guitar Amps", "Bass Amps", "Recording Capability"],
  },
  {
    id: "pjh2",
    name: "Underground Studios",
    city: "London",
    country: "UK",
    address: "42 Camden High Street",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    description: "Historic rehearsal space in the heart of Camden, where legendary punk and metal bands have jammed.",
    genres: ["punk", "hardcore", "metal"],
    featured: true,
    website: "https://undergroundstudios.uk",
    hourlyRate: "£25/hr",
    amenities: ["Full Backline", "24/7 Access", "Secure Storage", "Lounge Area"],
  },
  {
    id: "pjh3",
    name: "Noise Factory",
    city: "Berlin",
    country: "Germany",
    address: "Warschauer Str. 88",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    description: "Industrial-style rehearsal complex with multiple rooms catering to the heavy music scene.",
    genres: ["metalcore", "hardcore", "metal"],
    website: "https://noisefactory.de",
    hourlyRate: "€30/hr",
    amenities: ["Multiple Rooms", "Pro Audio", "Recording Studio", "Video Production"],
  },
  {
    id: "pjh4",
    name: "Volume Vault",
    city: "New York",
    country: "USA",
    address: "567 Bowery",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
    description: "NYC's go-to spot for hardcore and punk bands seeking an authentic East Coast sound.",
    genres: ["hardcore", "punk", "emo"],
    featured: true,
    website: "https://volumevault.nyc",
    hourlyRate: "$40/hr",
    amenities: ["Vintage Amps", "Full PA", "Climate Control", "Live Streaming Setup"],
  },
];

export const getGenreVariant = (genre: Genre) => {
  return genre as "metal" | "punk" | "emo" | "hardcore" | "alternative" | "rock" | "metalcore" | "post";
};
