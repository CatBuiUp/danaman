"use client";

import { usePathname } from "next/navigation";

import { isExperienceLandingPath } from "@/lib/story-ui-type";

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (isExperienceLandingPath(pathname)) {
    return children;
  }

  return <div className="pt-[84px]">{children}</div>;
}
