import { Suspense } from "react";

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
