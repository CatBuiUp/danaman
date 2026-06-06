"use client";

import Image from "next/image";
import Link from "next/link";

import { useContactPopup } from "@/components/layout/contact-popup-provider";

export function ExperienceLandingHeader() {
  const { openContactPopup } = useContactPopup();

  return (
    <header className="sticky top-0 z-40 border-b border-[#D0AE7D]/15 bg-[#1F2717]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
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
        <button
          type="button"
          onClick={openContactPopup}
          className="shrink-0 rounded-xl border border-[#D0AE7D]/40 px-3 py-2 font-[family-name:var(--font-montserrat)] text-[10px] font-medium uppercase tracking-wide text-[#EEDBC0] transition hover:bg-[#D0AE7D]/10 sm:text-[11px]"
        >
          Liên hệ
        </button>
      </div>
    </header>
  );
}
