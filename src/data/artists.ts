// src/data/artists.ts

// Define the type for an Artist to ensure type safety across components
export interface Artist {
  id: string;
  name: string;
  type: string;
  location: string;
  imageUrl: string;
  genres: string[];
  priceRange: string;
  rating: number;
  description?: string; // Optional description for artists
  bookingPrice?: number; // Optional booking price
}

// Dummy Artist Data - This will simulate your API or JSON data
export const dummyArtists: Artist[] = [
  {
    id: '1',
    name: 'Arijit Singh',
    type: 'Bollywood Singer',
    location: 'Mumbai, India',
    imageUrl: '/images/artist-arijit.jpg', // Placeholder image name
    genres: ['Bollywood', 'Pop', 'Romantic'],
    priceRange: '₹1,00,000+',
    rating: 4.9,
    description: "The soulful voice of Bollywood, known for his emotive ballads.",
    bookingPrice: 150000
  },
  {
    id: '2',
    name: 'Shiamak Davar',
    type: 'Choreographer/Dancer',
    location: 'Mumbai, India',
    imageUrl: '/images/artist-shiamak.jpg',
    genres: ['Bollywood', 'Contemporary', 'Jazz'],
    priceRange: '₹50,000 - ₹1,00,000',
    rating: 4.8,
    description: "Renowned choreographer and dance guru, pioneer of contemporary dance in India.",
    bookingPrice: 75000
  },
  {
    id: '3',
    name: 'Zakir Khan',
    type: 'Stand-up Comedian',
    location: 'Delhi, India',
    imageUrl: '/images/artist-zakir.jpg',
    genres: ['Comedy', 'Storytelling', 'Observational'],
    priceRange: '₹20,000 - ₹50,000',
    rating: 4.7,
    description: "Popular Indian stand-up comedian known for his 'Sakht Launda' persona.",
    bookingPrice: 40000
  },
  {
    id: '4',
    name: 'Nucleya',
    type: 'Electronic DJ',
    location: 'Goa, India',
    imageUrl: '/images/artist-nucleya.jpg',
    genres: ['EDM', 'Bass', 'Folkstep'],
    priceRange: '₹50,000 - ₹1,00,000',
    rating: 4.8,
    description: "Pioneer of Indian electronic music, famous for his bass-heavy tracks.",
    bookingPrice: 80000
  },
  {
    id: '5',
    name: 'Indian Ocean',
    type: 'Fusion Rock Band',
    location: 'Delhi, India',
    imageUrl: '/images/artist-indianocean.jpg',
    genres: ['Fusion', 'Folk Rock', 'Progressive Rock'],
    priceRange: '₹50,000 - ₹1,00,000',
    rating: 4.6,
    description: "One of India's most influential and experimental rock bands.",
    bookingPrice: 65000
  },
  {
    id: '6',
    name: 'Shreya Ghoshal',
    type: 'Playback Singer',
    location: 'Mumbai, India',
    imageUrl: '/images/artist-shreya.jpg',
    genres: ['Bollywood', 'Classical', 'Regional'],
    priceRange: '₹1,00,000+',
    rating: 4.9,
    description: "The melody queen of Indian cinema, with a vast vocal range.",
    bookingPrice: 120000
  },
  {
    id: '7',
    name: 'Raja Kumari',
    type: 'Hip-Hop Artist',
    location: 'Los Angeles, USA', // Keeping some international flavor, but still Indian origin
    imageUrl: '/images/artist-raja.jpg',
    genres: ['Hip-Hop', 'Rap', 'Indian Fusion'],
    priceRange: '₹20,000 - ₹50,000',
    rating: 4.5,
    description: "An American rapper, singer, and songwriter of Indian descent.",
    bookingPrice: 35000
  },
  {
    id: '8',
    name: 'Bhuban Badyakar',
    type: 'Viral Singer',
    location: 'West Bengal, India',
    imageUrl: '/images/artist-bhuban.jpg',
    genres: ['Folk', 'Viral'],
    priceRange: 'Under ₹20,000',
    rating: 3.5,
    description: "Internet sensation known for his viral song 'Kacha Badam'.",
    bookingPrice: 15000
  },
  {
    id: '9',
    name: 'Priya Mani',
    type: 'Classical Dancer',
    location: 'Chennai, India',
    imageUrl: '/images/artist-priya.jpg',
    genres: ['Bharatanatyam', 'Classical', 'Devotional'],
    priceRange: '₹20,000 - ₹50,000',
    rating: 4.7,
    description: "An exquisite Bharatanatyam performer and teacher.",
    bookingPrice: 28000
  },
  {
    id: '10',
    name: 'Kenny Sebastian',
    type: 'Stand-up Comedian',
    location: 'Bangalore, India',
    imageUrl: '/images/artist-kenny.jpg',
    genres: ['Comedy', 'Musical Comedy'],
    priceRange: '₹20,000 - ₹50,000',
    rating: 4.6,
    description: "Popular Indian stand-up comedian known for his relatable observational humor.",
    bookingPrice: 38000
  }
];

export const allGenres = Array.from(new Set(dummyArtists.flatMap(artist => artist.genres)));
export const allArtistTypes = Array.from(new Set(dummyArtists.map(artist => artist.type)));
export const priceRanges = ['Under ₹20,000', '₹20,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000+'];