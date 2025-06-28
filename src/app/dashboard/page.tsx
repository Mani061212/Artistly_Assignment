"use client"; // This line must be at the very top

import { useArtistContext } from '@/components/context/ArtistContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { artists } = useArtistContext(); // Get artists from the context

  return (
    <div className="min-h-screen py-12 bg-background flex items-center justify-center px-4">
      <div className="container max-w-4xl space-y-8 bg-card p-8 rounded-lg shadow-lg border border-border">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Manager Dashboard
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          Overview of onboarded artists and their details.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Artist Submissions</CardTitle>
            <CardDescription>
              A list of artists who have been onboarded to Artistly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {artists.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No artists have been onboarded yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artists.map((artist) => (
                      <TableRow key={artist.id}>
                        <TableCell className="font-medium">{artist.name}</TableCell>
                        <TableCell>{artist.type}</TableCell>
                        <TableCell>{artist.location}</TableCell>
                        <TableCell>
                          {artist.bookingPrice ? `₹${artist.bookingPrice.toLocaleString()}` : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href="/work-in-progress" passHref>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}