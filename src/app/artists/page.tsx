// src/app/artists/page.tsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArtistCard } from '@/components/artists/ArtistCard';
import { allArtistTypes, priceRanges } from '@/data/artists';
import { useArtistContext } from '@/components/context/ArtistContext';

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const { artists } = useArtistContext();

  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || 'all';
  const initialPriceRange = searchParams.get('priceRange') || 'all';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedPriceRange, setSelectedPriceRange] = useState(initialPriceRange);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedType(searchParams.get('type') || 'all');
    setSelectedPriceRange(searchParams.get('priceRange') || 'all');
  }, [searchParams]);

  const filteredArtists = useMemo(() => {
    let filtered = artists;

    if (searchTerm) {
      filtered = filtered.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((artist) => artist.type === selectedType);
    }

    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter((artist) => artist.priceRange === selectedPriceRange);
    }

    filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return filtered;
  }, [artists, searchTerm, selectedType, selectedPriceRange, sortOrder]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handlePriceRangeChange = (value: string) => {
    setSelectedPriceRange(value);
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Discover Artists
        </h1>

        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input
            type="text"
            placeholder="Search artists by name, description, or location..."
            className="max-w-sm w-full sm:w-auto p-2 border border-input rounded-md bg-card text-card-foreground"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger className="max-w-sm w-full sm:w-auto bg-card text-card-foreground border border-input">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="all">All Types</SelectItem>
              {allArtistTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPriceRange} onValueChange={handlePriceRangeChange}>
            <SelectTrigger className="max-w-sm w-full sm:w-auto bg-card text-card-foreground border border-input">
              <SelectValue placeholder="Filter by Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="all">All Price Ranges</SelectItem>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleSortToggle}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground text-lg">
              No artists found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}