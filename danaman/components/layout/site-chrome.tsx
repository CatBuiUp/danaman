"use client";

import { usePathname } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/components/layout";
import { isExperienceLandingPath } from "@/lib/story-ui-type";

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const hideSiteShell = isExperienceLandingPath(pathname);

  if (hideSiteShell) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="w-full min-w-0 flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
