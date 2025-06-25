import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ArtistProvider } from '@/components/context/ArtistContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artistly - Your Performing Artist Booking Platform',
  description: 'Connect event planners with artist managers for seamless bookings.',
  keywords: 'artist booking, event planning, performers, talent management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ArtistProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ArtistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}