import Link from "next/link";
import type { ReactNode } from "react";

import { footerSocialLinks } from "@/lib/footer-social-links";
import { formatPriceVnd } from "@/lib/story-card-mappers";

type CtaButtonsProps = {
  zaloHref: string;
  messengerHref: string;
  className?: string;
  compact?: boolean;
};

export function ExperienceLandingCtaButtons({
  zaloHref,
  messengerHref,
  className = "",
  compact = false,
}: CtaButtonsProps) {
  const buttonClass = compact
    ? "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-[family-name:var(--font-montserrat)] text-[11px] font-bold uppercase tracking-wide transition sm:text-xs"
    : "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide transition";

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link
        href={zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} bg-[#0068FF] text-white hover:brightness-110`}
      >
        <ZaloIcon />
        Đặt qua Zalo
      </Link>
      <Link
        href={messengerHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} border-2 border-[#0084FF] bg-white text-[#0084FF] hover:bg-[#0084FF]/5`}
      >
        <MessengerIcon />
        Chat qua Messenger
      </Link>
    </div>
  );
}

export function ExperienceLandingStickyBar({
  priceFrom,
  zaloHref,
  messengerHref,
}: {
  priceFrom: number;
  zaloHref: string;
  messengerHref: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D0AE7D]/20 bg-[#1F2717]/95 px-4 py-3 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 shrink-0">
          <p className="font-[family-name:var(--font-inter)] text-[10px] text-[#D7C9B2]">Từ</p>
          <p className="font-[family-name:var(--font-inter)] text-base font-bold text-[#D0AE7D]">
            {formatPriceVnd(priceFrom)}
            <span className="text-xs font-normal text-[#EEDBC0]/90"> / người</span>
          </p>
        </div>
        <ExperienceLandingCtaButtons zaloHref={zaloHref} messengerHref={messengerHref} compact />
      </div>
    </div>
  );
}

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.67 1.44 5.05 3.68 6.62L5 22l4.72-2.36c.72.12 1.46.18 2.28.18 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.13 2 11.25c0 2.89 1.43 5.45 3.66 7.1L4.5 21.5l4.05-2.23c1.08.3 2.23.47 3.45.47 5.52 0 10-4.13 10-9.25S17.52 2 12 2zm1.03 11.9-2.55-2.73-4.99 2.73 5.49-5.83 2.62 2.73 4.93-2.73-5.5 5.83z" />
    </svg>
  );
}

export function ExperienceLandingMiniFooter() {
  return (
    <footer className="rounded-2xl border border-[#D0AE7D]/15 bg-[#1F2717] px-5 py-6 text-center">
      <p className="font-[family-name:var(--font-montserrat)] text-[11px] font-light uppercase tracking-[0.28em] text-[#D0AE7D]">
        Danaman
      </p>
      <p className="mt-2 font-[family-name:var(--font-inter)] text-xs leading-relaxed text-[#D7C9B2]">
        Kết nối con người, câu chuyện và văn hóa địa phương
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <SocialLink href={footerSocialLinks.facebook} label="Facebook">
          FB
        </SocialLink>
        <SocialLink href={footerSocialLinks.zalo} label="Zalo">
          Zalo
        </SocialLink>
        <SocialLink href={footerSocialLinks.youtube} label="YouTube">
          YT
        </SocialLink>
        <SocialLink href={footerSocialLinks.tiktok} label="TikTok">
          TT
        </SocialLink>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D0AE7D]/30 font-[family-name:var(--font-inter)] text-[10px] font-semibold text-[#EEDBC0] transition hover:border-[#D0AE7D] hover:text-[#D0AE7D]"
    >
      {children}
    </Link>
  );
}
