import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MotionDiv } from '@/components/shared/MotionDiv';
import { Star } from 'lucide-react';

// Define the type for an Artist to ensure type safety
interface Artist {
  id: string;
  name: string;
  type: string;
  location: string;
  imageUrl: string;
  genres: string[];
  priceRange: string;
  rating: number;
  description?: string;
  bookingPrice?: number;
}

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

export const ArtistCard = ({ artist, index }: ArtistCardProps) => {
  const imageSource = artist.imageUrl === 'http://image.jpg' ? '/default-artist.png' : artist.imageUrl;

  return (
    <MotionDiv
      key={artist.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full aspect-video">
          <Image
            src={imageSource}
            alt={artist.name}
            fill
            className="rounded-t-lg object-cover shadow-md"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-foreground">{artist.name}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            {artist.type} - {artist.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-0 pb-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {artist.rating} Rating
          </p>
          <p>Price: {artist.priceRange}</p>
          <p>Genres: {artist.genres.join(', ')}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <Link href="/work-in-progress" className="w-full" passHref>
            <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-600/10">
              Ask for Quote
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};