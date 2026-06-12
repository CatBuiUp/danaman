"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { footerSocialLinks } from "@/lib/footer-social-links";
import { formatPriceVnd } from "@/lib/story-card-mappers";

type CtaButtonsProps = {
  zaloHref: string;
  messengerHref: string;
  whatsappHref: string;
  className?: string;
  compact?: boolean;
};

export function ExperienceLandingCtaButtons({
  zaloHref,
  messengerHref,
  whatsappHref,
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
      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} border-2 border-[#25D366] bg-white text-[#25D366] hover:bg-[#25D366]/5`}
      >
        <WhatsAppIcon />
        WhatsApp
      </Link>
    </div>
  );
}

export function ExperienceLandingStickyBar({
  priceFrom,
  zaloHref,
  messengerHref,
  whatsappHref,
}: {
  priceFrom: number;
  zaloHref: string;
  messengerHref: string;
  whatsappHref: string;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D0AE7D]/20 bg-[#1F2717]/95 px-4 py-2.5 backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-inter)] text-[10px] text-[#D7C9B2]">Từ</p>
            <p className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#D0AE7D]">
              {formatPriceVnd(priceFrom)}
              <span className="text-xs font-normal text-[#EEDBC0]/90"> / người</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            aria-label="Hiện thanh đặt chỗ"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D0AE7D]/30 text-[#EEDBC0] transition hover:border-[#D0AE7D] hover:text-[#D0AE7D]"
          >
            <ChevronUpIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D0AE7D]/20 bg-[#1F2717]/95 px-4 pb-3 pt-1 backdrop-blur-sm lg:hidden">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center pb-1">
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            aria-label="Ẩn thanh đặt chỗ"
            className="flex h-7 w-10 items-center justify-center rounded-full text-[#D7C9B2] transition hover:bg-white/10 hover:text-[#EEDBC0]"
          >
            <ChevronDownIcon />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="min-w-0 shrink-0">
            <p className="font-[family-name:var(--font-inter)] text-[10px] text-[#D7C9B2]">Từ</p>
            <p className="font-[family-name:var(--font-inter)] text-base font-bold text-[#D0AE7D]">
              {formatPriceVnd(priceFrom)}
              <span className="text-xs font-normal text-[#EEDBC0]/90"> / người</span>
            </p>
          </div>
          <ExperienceLandingCtaButtons
            zaloHref={zaloHref}
            messengerHref={messengerHref}
            whatsappHref={whatsappHref}
            compact
          />
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.882 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
