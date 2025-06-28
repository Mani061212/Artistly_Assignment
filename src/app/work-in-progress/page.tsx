"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MotionDiv } from '@/components/shared/MotionDiv'; // Assuming you have this
import { MotionH1 } from '@/components/shared/MotionH1'; // Assuming you have this

export default function WorkInProgressPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-12 text-center">
      <MotionH1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
      >
        Work In Progress
      </MotionH1>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-xl text-lg md:text-xl text-muted-foreground mb-8"
      >
        <p>This feature is currently under development.</p>
        <p>Please check back later for updates!</p>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link href="/" passHref>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Go to Homepage
          </Button>
        </Link>
      </MotionDiv>
    </div>
  );
}