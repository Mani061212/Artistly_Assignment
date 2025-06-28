"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from 'lucide-react';

// Define types for filter options for clarity
interface FilterOptions {
  selectedGenres: string[];
  selectedTypes: string[];
  selectedPriceRange: string;
  locationFilter: string;
}

interface ArtistFilterSheetProps {
  // Props to control sheet visibility
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  // Callbacks to pass filter values back to parent (page.tsx, which passes to context)
  onApplyFilters: (filters: FilterOptions) => void;
  onClearAllFilters: () => void; // Callback to clear all filters in parent/context
  allGenres: string[];
  allArtistTypes: string[];
  priceRanges: string[];
  // Current filters from parent (for initial state in the sheet)
  initialFilters: FilterOptions;
}

export const ArtistFilterSheet = ({
  isOpen,
  onOpenChange,
  onApplyFilters,
  onClearAllFilters,
  allGenres,
  allArtistTypes,
  priceRanges,
  initialFilters,
}: ArtistFilterSheetProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialFilters.selectedGenres);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialFilters.selectedTypes);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>(initialFilters.selectedPriceRange);
  const [locationFilter, setLocationFilter] = useState<string>(initialFilters.locationFilter);

  useEffect(() => {
    setSelectedGenres(initialFilters.selectedGenres);
    setSelectedTypes(initialFilters.selectedTypes);
    setSelectedPriceRange(initialFilters.selectedPriceRange);
    setLocationFilter(initialFilters.locationFilter);
  }, [initialFilters]);


  const handleGenreChange = (genre: string, checked: boolean) => {
    setSelectedGenres(prev =>
      checked ? [...prev, genre] : prev.filter(g => g !== genre)
    );
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes(prev =>
      checked ? [...prev, type] : prev.filter(t => t !== type)
    );
  };

  const handleClearInternalFilters = () => {
    // Reset internal sheet form state
    setSelectedGenres([]);
    setSelectedTypes([]);
    setSelectedPriceRange('');
    setLocationFilter('');
    // Trigger parent's (context's) clear function
    onClearAllFilters();
  };

  const handleApplyInternalFilters = () => {
    // Pass current internal state to parent's (context's) apply function
    onApplyFilters({
      selectedGenres,
      selectedTypes,
      selectedPriceRange,
      locationFilter,
    });
    onOpenChange(false); // Close the sheet after applying filters
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {/* Adjusted Button Styling for better Light Mode visibility */}
        <Button
          variant="outline"
          className="flex items-center gap-2 border-artistic text-artistic hover:bg-artistic/20 focus-visible:ring-artistic"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Filter Artists</SheetTitle>
          <SheetDescription>Adjust your preferences to find the perfect artist.</SheetDescription>
        </SheetHeader>
        <div className="mt-8 flex-grow space-y-6 overflow-y-auto pr-2">
          {/* Genre Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Genres</h3>
            <div className="flex flex-col gap-2">
              {allGenres.map(genre => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => handleGenreChange(genre, !!checked)}
                  />
                  <label
                    htmlFor={`genre-${genre}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Artist Type Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Artist Type</h3>
            <div className="flex flex-col gap-2">
              {allArtistTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => handleTypeChange(type, !!checked)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <Input
              type="text"
              placeholder="e.g., Mumbai, Delhi"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a price range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>

        <div className="mt-auto pt-6 border-t border-border flex justify-end gap-2">
          <Button variant="ghost" onClick={handleClearInternalFilters}>Clear Filters</Button>
          <Button className="bg-artistic hover:bg-artistic-dark text-white" onClick={handleApplyInternalFilters}>Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};