"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/artists', label: 'Artists' },
    { href: '/onboard', label: 'Onboarding' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-background border-b border-border shadow-sm relative z-50">
      {/* Logo as Symbol and Title */}
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[hsl(15_100%_57%)] hover:text-[hsl(355_89%_49%)] transition-colors duration-200 z-10">
        <Sparkles className="h-8 w-8 text-[hsl(15_100%_57%)]" />
        Artistly
      </Link>

      {/* Desktop Navigation - Centered, styled as a pill */}
      <nav className="hidden md:flex absolute inset-x-0 mx-auto justify-center z-10">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full shadow-md bg-black text-white dark:bg-white dark:text-black">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} passHref>
                <Button
                  variant="ghost"
                  className={`rounded-full px-4 py-2 text-base font-medium transition-colors duration-200
                              ${isActive
                                ? 'bg-[hsl(15_100%_57%)] text-white hover:bg-[hsl(355_89%_49%)]'
                                : 'text-[hsl(210_40%_98%)] hover:bg-gray-800 dark:text-[hsl(222.2_47.4%_11.2%)] dark:hover:bg-gray-200'
                              }`}
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Right side: Theme Toggle and Login Button (visible on desktop) */}
      <div className="flex items-center gap-4 z-10">
        <ThemeToggle />
        <Link href="/work-in-progress" passHref className="hidden md:block">
          <Button className="bg-[hsl(15_100%_57%)] text-white hover:bg-[hsl(355_89%_49%)] font-medium px-4 py-2 rounded-md">
            Login
          </Button>
        </Link>

        {/* Mobile Menu Trigger */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col pt-12 bg-background">
            <SheetHeader>
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} passHref>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-lg py-3 transition-colors duration-200
                                  ${isActive
                                    ? 'bg-[hsl(15_100%_57%)] text-white hover:bg-[hsl(355_89%_49%)]'
                                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                                  }`}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto pt-6 border-t border-border">
              <Link href="/work-in-progress" passHref>
                <Button className="w-full bg-[hsl(15_100%_57%)] text-white hover:bg-[hsl(355_89%_49%)] font-medium py-2 rounded-md">
                  Login
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};