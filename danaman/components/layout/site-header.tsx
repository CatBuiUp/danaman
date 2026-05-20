"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { joinDanamanHref, siteNavLinks } from "@/lib/site-nav";

const HEADER_SCROLL_THRESHOLD = 24;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 z-50 w-full min-w-0 transition-colors duration-300 ${
        isSolid
          ? "border-b border-[#D0AE7D]/15 bg-[#1F2717]/95 shadow-md backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-6 py-2 sm:px-10 lg:px-14">
        <Link href="/" className="inline-flex shrink-0 items-center">
          <Image
            src="/danaman_logo.png"
            alt="Danaman logo"
            width={656}
            height={461}
            priority
            quality={100}
            sizes="240px"
            unoptimized
            className="h-[60px] w-auto sm:h-[68px]"
          />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-10"
          aria-label="Main navigation"
        >
          {siteNavLinks.map(({ label, href }) => {
            const isExternal = href.startsWith("http");
            return (
              <Link
                key={label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="font-[family-name:var(--font-montserrat)] text-[11px] font-light uppercase tracking-[0.2em] text-[#EEDBC0] transition hover:text-[#D0AE7D]"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={joinDanamanHref}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 rounded-2xl border border-[#D0AE7D] px-4 py-2 font-[family-name:var(--font-montserrat)] text-xs font-medium tracking-wide text-[#EEDBC0] transition hover:bg-[#D0AE7D]/10 lg:ml-0"
        >
          Tham gia Danaman
        </Link>
      </div>
    </header>
  );
}
