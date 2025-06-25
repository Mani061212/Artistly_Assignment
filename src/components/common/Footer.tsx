import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8 bg-background border-t border-border text-center text-muted-foreground text-sm">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Artistly. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};