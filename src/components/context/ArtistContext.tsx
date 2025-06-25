"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { dummyArtists, allGenres, allArtistTypes, priceRanges, Artist } from '@/data/artists';

// 1. Define the shape of your context state
interface FilterOptions {
  selectedGenres: string[];
  selectedTypes: string[];
  selectedPriceRange: string;
  locationFilter: string;
}

interface ArtistContextType {
  artists: Artist[]; // The original dummy data (now mutable state)
  filteredArtists: Artist[]; // The filtered list
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  appliedFilters: FilterOptions;
  setAppliedFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  handleApplyFilters: (filters: FilterOptions) => void;
  handleClearFilters: () => void;
  addArtist: (artist: Artist) => void; // New function to add an artist
  allGenres: string[];
  allArtistTypes: string[];
  priceRanges: string[];
}

// 2. Create the Context
const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

// 3. Create a Provider component
interface ArtistProviderProps {
  children: ReactNode;
}

export const ArtistProvider = ({ children }: ArtistProviderProps) => {
  // Use useState to make dummyArtists mutable within the context
  const [artistsState, setArtistsState] = useState<Artist[]>(dummyArtists);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({
    selectedGenres: [],
    selectedTypes: [],
    selectedPriceRange: '',
    locationFilter: '',
  });

  const handleApplyFilters = (filters: FilterOptions) => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setAppliedFilters({
      selectedGenres: [],
      selectedTypes: [],
      selectedPriceRange: '',
      locationFilter: '',
    });
  };

  // Function to add a new artist
  const addArtist = (artist: Artist) => {
    setArtistsState(prev => [...prev, artist]);
  };

  // Filtering logic - now depends on artistsState
  const filteredArtists = useMemo(() => {
    let filtered: Artist[] = artistsState; // Use artistsState here

    // 1. Search Term Filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        artist.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        artist.location.toLowerCase().includes(lowerCaseSearchTerm) ||
        artist.genres.some(genre => genre.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // 2. Genre Filter
    if (appliedFilters.selectedGenres.length > 0) {
      filtered = filtered.filter(artist =>
        artist.genres.some(genre => appliedFilters.selectedGenres.includes(genre))
      );
    }

    // 3. Type Filter
    if (appliedFilters.selectedTypes.length > 0) {
      filtered = filtered.filter(artist =>
        appliedFilters.selectedTypes.includes(artist.type)
      );
    }

    // 4. Location Filter
    if (appliedFilters.locationFilter) {
      const lowerCaseLocationFilter = appliedFilters.locationFilter.toLowerCase();
      filtered = filtered.filter(artist =>
        artist.location.toLowerCase().includes(lowerCaseLocationFilter)
      );
    }

    // 5. Price Range Filter (simplified for dummy data)
    if (appliedFilters.selectedPriceRange) {
      filtered = filtered.filter(artist => {
        if (appliedFilters.selectedPriceRange === 'Under ₹20,000') {
          return artist.priceRange.includes('₹15,000') || artist.priceRange.includes('₹18,000');
        } else if (appliedFilters.selectedPriceRange === '₹20,000 - ₹50,000') {
          return artist.priceRange.includes('₹20,000') || artist.priceRange.includes('₹25,000') || artist.priceRange.includes('₹40,000') || artist.priceRange.includes('₹45,000');
        } else if (appliedFilters.selectedPriceRange === '₹50,000 - ₹1,00,000') {
          return artist.priceRange.includes('₹50,000') || artist.priceRange.includes('₹60,000') || artist.priceRange.includes('₹75,000') || artist.priceRange.includes('₹80,000');
        } else if (appliedFilters.selectedPriceRange === '₹1,00,000+') {
          return artist.priceRange.includes('₹1,00,000+');
        }
        return false;
      });
    }

    return filtered;
  }, [searchTerm, appliedFilters, artistsState]); // Add artistsState to dependency array

  const contextValue: ArtistContextType = {
    artists: artistsState, // Now uses the mutable state
    filteredArtists,
    searchTerm,
    setSearchTerm,
    appliedFilters,
    setAppliedFilters,
    handleApplyFilters,
    handleClearFilters,
    addArtist, // Include the new function
    allGenres,
    allArtistTypes,
    priceRanges,
  };

  return (
    <ArtistContext.Provider value={contextValue}>
      {children}
    </ArtistContext.Provider>
  );
};

// 4. Create a custom hook to use the context
export const useArtistContext = () => {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error('useArtistContext must be used within an ArtistProvider');
  }
  return context;
};