// src/app/onboard/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';

// ShadCN UI Components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils'; // Utility for conditional classnames

// Re-importing data and context for dropdown options and adding artist
import { allArtistTypes, priceRanges, Artist } from '@/data/artists';
import { useArtistContext } from '@/components/context/ArtistContext'; // Import the context hook

// Curated list of genres for the onboarding form
const onboardGenres = [
  'Bollywood',
  'Pop',
  'Hip-Hop',
  'Comedy',
  'Classical',
  'EDM',
  'Folk',
  'Rock',
  'Jazz',
  'Romantic',
  'Storytelling',
  'Fusion',
];

// Form Schema Definition using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Artist name must be at least 2 characters.' }).max(100, { message: 'Artist name cannot exceed 100 characters.' }),
  type: z.string().nonempty({ message: 'Please select an artist type.' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }).max(100, { message: 'Location cannot exceed 100 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL for the image.' }).or(z.literal('')),
  genres: z.array(z.string()).min(1, { message: 'Please select at least one genre.' }),
  priceRange: z.string().nonempty({ message: 'Please select a price range.' }),
  rating: z.coerce.number().min(1, { message: 'Rating must be at least 1.' }).max(5, { message: 'Rating cannot exceed 5.' }),
});

type OnboardFormValues = z.infer<typeof formSchema>;

export default function ArtistOnboardingPage() {
  const router = useRouter();
  const { addArtist } = useArtistContext(); // Get the addArtist function from context

  const form = useForm<OnboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      location: '',
      imageUrl: '',
      genres: [],
      priceRange: '',
      rating: 4.0, // Default rating
    },
  });

  const onSubmit = (values: OnboardFormValues) => {
    // Generate a simple unique ID for the new artist
    const newArtistId = new Date().getTime().toString() + Math.random().toString(36).substring(2, 9);

    const newArtist: Artist = {
      id: newArtistId,
      name: values.name,
      type: values.type,
      location: values.location,
      imageUrl: values.imageUrl || 'https://via.placeholder.com/150?text=Artist+Image', // Fallback image
      genres: values.genres,
      priceRange: values.priceRange,
      rating: values.rating,
      description: "This is a new artist onboarded via the form.",
      bookingPrice: values.rating * 10000, // Example derived value
    };

    console.log('New Artist Data:', newArtist);
    addArtist(newArtist); // Add the new artist to the context state

    alert('Artist onboarded successfully! You will be redirected to the artists page.');
    form.reset(); // Reset form fields
    router.push('/artists'); // Redirect to the artists listing page
  };

  return (
    <div className="min-h-screen py-12 bg-background flex items-center justify-center">
      <div className="container max-w-2xl px-4 md:px-8 lg:px-16 space-y-8 bg-card p-8 rounded-lg shadow-lg border border-border">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
          Onboard a New Artist
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          Fill out the details below to add a new artist to Artistly.com.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Artist Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Arijit Singh" {...field} />
                  </FormControl>
                  <FormDescription>The full name or stage name of the artist.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Artist Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select artist type" />
                      </SelectTrigger>
                    </FormControl>
                    {/* --- UPDATED: Select Content for Artist Type --- */}
                    <SelectContent
                      className={cn(
                        "bg-black text-white", // Light mode: Black background, white text
                        "dark:bg-white dark:text-black" // Dark mode: White background, black text
                      )}
                    >
                      {allArtistTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The primary category of the artist (e.g., Singer, Comedian).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mumbai, India" {...field} />
                  </FormControl>
                  <FormDescription>The primary city/region where the artist is based.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., https://example.com/artist.jpg" {...field} />
                  </FormControl>
                  <FormDescription>A direct link to the artists profile image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genres (Multi-select using Popover and Command) */}
            <FormField
              control={form.control}
              name="genres"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Genres</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value.length && "text-muted-foreground"
                          )}
                        >
                          {field.value.length > 0
                            ? field.value.join(', ')
                            : "Select genres..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    {/* --- UPDATED: Popover Content for Genres (Ensuring consistency) --- */}
                    <PopoverContent
                      className={cn(
                        "w-[--radix-popover-trigger-width] p-0 rounded-md overflow-hidden",
                        "bg-black text-white", // Light mode: Black background, white text
                        "dark:bg-white dark:text-black" // Dark mode: White background, black text
                      )}
                    >
                      <Command>
                        <CommandInput placeholder="Search genre..." />
                        <CommandEmpty>No genre found.</CommandEmpty>
                        <CommandGroup>
                          {onboardGenres.map((genre) => (
                            <CommandItem
                              key={genre}
                              onSelect={() => {
                                const newValue = field.value.includes(genre)
                                  ? field.value.filter((g) => g !== genre)
                                  : [...field.value, genre];
                                field.onChange(newValue);
                              }}
                            >
                              <Checkbox
                                checked={field.value.includes(genre)}
                                className="mr-2"
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, genre]
                                    : field.value.filter((g) => g !== genre);
                                  field.onChange(newValue);
                                }}
                              />
                              {genre}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value.includes(genre) ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select the genres associated with the artist.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Range */}
            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                    </FormControl>
                    {/* --- UPDATED: Select Content for Price Range --- */}
                    <SelectContent
                      className={cn(
                        "bg-black text-white", // Light mode: Black background, white text
                        "dark:bg-white dark:text-black" // Dark mode: White background, black text
                      )}
                    >
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The typical price range for the artists bookings.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="1" max="5" placeholder="e.g., 4.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormDescription>The artists average rating (on a scale of 1 to 5).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Onboard Artist Button */}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Onboard Artist
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}