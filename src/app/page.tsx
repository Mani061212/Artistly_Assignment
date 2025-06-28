'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MotionDiv } from '@/components/shared/MotionDiv';
import { MotionSection } from '@/components/shared/MotionSection';
import { MotionH1 } from '@/components/shared/MotionH1';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const categories = [
    { name: 'Singers', icon: '/Images/home/Singer.jpg', description: 'Vocal powerhouses for any event.', slug: 'singers' },
    { name: 'Dancers', icon: '/Images/home/Dancer.jpg', description: 'Dynamic performers and choreographers.', slug: 'dancers' },
    { name: 'Speakers', icon: '/Images/home/Speaker.jpg', description: 'Inspirational and informative speakers.', slug: 'speakers' },
    { name: 'DJs', icon: '/Images/home/Dj.jpg', description: 'Beat creators for unforgettable parties.', slug: 'djs' },
  ];

  const features = [
    { title: 'Effortless Booking', description: 'Find and book the perfect artist with our intuitive platform.', icon: '/Images/home/E-Booking.jpg' },
    { title: 'Diverse Talent Pool', description: 'Access a wide range of singers, dancers, speakers, and more.', icon: '/Images/home/Talent.webp' },
    { title: 'Seamless Management', description: 'Onboard artists and track submissions with ease.', icon: '/Images/home/Management.png' },
  ];

  return (
    <>
      {/* Hero Section - Full Width Background, Contained Content */}
      <MotionSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-background text-foreground py-20 md:py-28 lg:py-36"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <MotionH1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
            >
              <span className="bg-gradient-to-r from-[hsl(15_100%_57%)] to-[hsl(355_89%_49%)] bg-clip-text text-transparent">
                Connect, Create, Captivate.
              </span>
            </MotionH1>
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
            >
              Artistly is the premier platform connecting talented performing artists with event managers worldwide. Discover, book, and manage artistic talent effortlessly.
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start"
            >
              <Link href="/artists" passHref>
                <Button size="lg" className="bg-[hsl(15_100%_57%)] hover:bg-[hsl(355_89%_49%)] text-white shadow-md transition-all duration-200">
                  Explore Artists
                </Button>
              </Link>
              <Link href="/onboard" passHref>
                <Button size="lg" variant="outline" className="border-[hsl(15_100%_57%)] text-[hsl(15_100%_57%)] hover:bg-[hsl(15_100%_57%)]/20 transition-all duration-200">
                  Onboard Your Talent
                </Button>
              </Link>
            </MotionDiv>
          </div>
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/Images/home/Hero-Artist.avif"
              alt="Diverse artists performing"
              fill
              className="rounded-2xl object-cover transition-transform duration-300 hover:scale-105"
            />
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Categories Section - Contained Content */}
      <MotionSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="w-full py-16 md:py-24 bg-background text-center"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            Explore Top Categories
          </MotionH1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Link href={`/artists?category=${category.slug}`} passHref key={category.name}>
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Card className="flex flex-col items-center p-6 h-full bg-card hover:bg-card/90 transition-colors duration-300 shadow-md hover:shadow-lg">
                    <CardHeader className="p-0 pb-4">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                        <Image
                          src={category.icon}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground text-center">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-center text-sm p-0">
                      {category.description}
                    </CardContent>
                  </Card>
                </MotionDiv>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Features Section - Contained Content */}
      <MotionSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="w-full py-16 md:py-24 bg-muted text-center"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            Why Choose Artistly?
          </MotionH1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 + index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {feature.icon.endsWith('.jpg') || feature.icon.endsWith('.avif') || feature.icon.endsWith('.webp') || feature.icon.endsWith('.png') ? (
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="rounded-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}