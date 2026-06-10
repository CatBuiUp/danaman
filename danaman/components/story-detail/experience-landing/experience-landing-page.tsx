import Image from "next/image";
import Link from "next/link";

import type { ExperienceLandingContent } from "@/lib/experience-landing-content";
import { footerSocialLinks } from "@/lib/footer-social-links";
import { formatPriceVnd } from "@/lib/story-card-mappers";
import type { Story } from "@/types";

import {
  ExperienceLandingCtaButtons,
  ExperienceLandingMiniFooter,
  ExperienceLandingStickyBar,
} from "./experience-landing-cta";
import { ExperienceLandingGallery } from "./experience-landing-gallery";
import { ExperienceLandingHeader } from "./experience-landing-header";
import { ExperienceLandingVideoPreview } from "./experience-landing-video-preview";

type ExperienceLandingPageProps = {
  story: Story;
  content: ExperienceLandingContent;
};

export function ExperienceLandingPage({ story, content }: ExperienceLandingPageProps) {
  const galleryImages = content.galleryImages;
  const zaloHref = footerSocialLinks.zalo;
  const messengerHref = footerSocialLinks.facebook;

  return (
    <div className="min-h-screen bg-[#F9F7F2] pb-28 lg:pb-10">
      <ExperienceLandingHeader />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left column */}
          <div className="space-y-8">
            <section className="relative overflow-hidden rounded-3xl">
              <div className="relative flex min-h-[610px] flex-col sm:min-h-[760px]">
                <div className="absolute inset-0">
                  <div className="relative h-full w-full">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2717]/95 via-[#1F2717]/55 to-[#1F2717]/25" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="p-4 sm:p-5">
                    <Link
                      href="/"
                      aria-label="Về trang chủ"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/35 font-[family-name:var(--font-inter)] text-lg text-white backdrop-blur transition hover:bg-black/55"
                    >
                      ←
                    </Link>
                  </div>

                  <div className="flex-1" aria-hidden />

                  <div className="px-5 pb-5 sm:px-8 sm:pb-6">
                    <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight text-[#EEDBC0] sm:text-4xl lg:text-[2.75rem]">
                      {content.headline}
                    </h1>
                    <p className="mt-2 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#D7C9B2] sm:text-base">
                      {content.subtitle}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {content.metaItems.map((item) => (
                        <li
                          key={item.text}
                          className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-xs text-[#C6B89F] sm:text-sm"
                        >
                          <HeroMetaIcon icon={item.icon} />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-t-3xl bg-white px-5 py-5 shadow-[0_-8px_32px_rgba(31,39,23,0.12)] sm:px-6 sm:py-6">
                    <p className="font-[family-name:var(--font-inter)] text-sm text-[#5F6557]">
                      TỪ{" "}
                      <span className="text-2xl font-bold text-[#B08D57] sm:text-3xl">
                        {formatPriceVnd(content.priceFrom)}
                      </span>
                      <span className="text-base font-normal text-[#5F6557]"> / người</span>
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-[#8A907E] sm:text-sm">
                      {content.priceNote}
                    </p>
                    <div className="mt-5">
                      <ExperienceLandingCtaButtons zaloHref={zaloHref} messengerHref={messengerHref} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ExperienceLandingVideoPreview
              images={galleryImages}
              fallbackImage={story.image}
              videoDuration={content.videoDuration}
            />

            <section>
              <h2 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2717] sm:text-base">
                Vì sao đặc biệt?
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {content.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center rounded-2xl border border-[#D0AE7D]/15 bg-white px-3 py-4 text-center shadow-sm"
                  >
                    <HighlightIcon icon={item.icon} />
                    <p className="mt-2 font-[family-name:var(--font-inter)] text-xs leading-snug text-[#1F2717] sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2717] sm:text-base">
                Hành trình trải nghiệm
              </h2>
              <ol className="mt-5 space-y-4">
                {content.itinerary.map((step) => (
                  <li
                    key={step.step}
                    className="flex gap-4 rounded-2xl border border-[#D0AE7D]/15 bg-white p-4 shadow-sm"
                  >
                    {step.image ? (
                      <div className="relative shrink-0 pl-3 pt-3">
                        <div className="relative h-20 w-[8.75rem] overflow-hidden rounded-2xl border border-white shadow-sm sm:h-24 sm:w-40">
                          <Image src={step.image} alt={step.title} fill className="object-cover" sizes="160px" />
                        </div>
                        <span
                          aria-label={`Bước ${step.step}`}
                          className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#B08D57] font-[family-name:var(--font-montserrat)] text-base font-bold text-white shadow-md"
                        >
                          {step.step}
                        </span>
                      </div>
                    ) : (
                      <span
                        aria-label={`Bước ${step.step}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B08D57] font-[family-name:var(--font-montserrat)] text-sm font-bold text-white"
                      >
                        {step.step}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-medium text-[#1F2717]">
                        {step.title}
                      </h3>
                      <p className="mt-1 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#5F6557]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            <ExperienceLandingGallery images={galleryImages} />

            <section className="rounded-3xl border border-[#D0AE7D]/15 bg-white p-5 shadow-sm">
              <h2 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2717] sm:text-base">
                Thông tin nhanh
              </h2>
              <ul className="mt-4 divide-y divide-[#D0AE7D]/10">
                {content.quickInfo.map((item) => (
                  <li key={item.label} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <QuickInfoIcon icon={item.icon} />
                      <span className="font-[family-name:var(--font-inter)] text-sm text-[#5F6557]">{item.label}</span>
                    </div>
                    <span className="max-w-[55%] text-right font-[family-name:var(--font-inter)] text-sm font-medium text-[#1F2717]">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-[#D0AE7D]/15 bg-white p-5 shadow-sm">
              <h2 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2717] sm:text-base">
                Khách hàng nói gì
              </h2>
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  {content.testimonial.avatar ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={content.testimonial.avatar}
                        alt={content.testimonial.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : null}
                  <div>
                    <StarRating rating={content.testimonial.rating} />
                    <p className="mt-1 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717]">
                      {content.testimonial.author}
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-xs text-[#8A907E]">
                      {content.testimonial.location}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#5F6557]">
                  &ldquo;{content.testimonial.quote}&rdquo;
                </blockquote>
              </div>
            </section>

            <section className="rounded-3xl bg-[#1F2717] p-5 text-center sm:p-6">
              <h2 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.18em] text-[#D0AE7D]">
                Sẵn sàng tham gia?
              </h2>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-[#D7C9B2]">
                Đặt trải nghiệm ngay hôm nay!
              </p>
              <div className="mt-5">
                <ExperienceLandingCtaButtons zaloHref={zaloHref} messengerHref={messengerHref} />
              </div>
              <p className="mt-4 font-[family-name:var(--font-inter)] text-xs text-[#8A907E]">{content.supportNote}</p>
              <a
                href={`tel:${content.contactPhone.replace(/\s/g, "")}`}
                className="mt-1 inline-block font-[family-name:var(--font-inter)] text-lg font-semibold text-[#D0AE7D] transition hover:text-[#e0c090]"
              >
                {content.contactPhone}
              </a>
            </section>

            <ExperienceLandingMiniFooter />
          </aside>
        </div>
      </div>

      <ExperienceLandingStickyBar priceFrom={content.priceFrom} zaloHref={zaloHref} messengerHref={messengerHref} />
    </div>
  );
}

function HeroMetaIcon({ icon }: { icon: ExperienceLandingContent["metaItems"][number]["icon"] }) {
  const className = "h-4 w-4 shrink-0 text-[#D0AE7D]";

  if (icon === "heritage") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 14.8 7.2 17.8l.9-5.3L4.2 7.7l5.4-.8L12 2z" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <path
          d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? "text-[#D0AE7D]" : "text-[#D0AE7D]/30"} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

function HighlightIcon({ icon }: { icon: ExperienceLandingContent["highlights"][number]["icon"] }) {
  const className = "h-8 w-8 text-[#B08D57]";
  if (icon === "artisan") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 19c1-3 3.5-4.5 6-4.5s5 1.5 6 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "place") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === "meal") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <path d="M6 4v8a4 4 0 0 0 8 0V4M14 4v16M18 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function QuickInfoIcon({ icon }: { icon: ExperienceLandingContent["quickInfo"][number]["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[#B08D57]" fill="none" aria-hidden>
      {icon === "location" ? (
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" strokeWidth="1.5" />
      ) : icon === "time" ? (
        <>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : icon === "guests" ? (
        <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a2.5 2.5 0 1 0 0-5M4 19a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : icon === "language" ? (
        <path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M8 7V5a4 4 0 1 1 8 0v2M6 7h12v12H6V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      )}
    </svg>
  );
}
