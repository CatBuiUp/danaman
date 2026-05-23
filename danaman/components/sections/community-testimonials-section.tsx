"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import {
  communityFeatures,
  communityIntro,
  communityTestimonials,
  DESKTOP_SCROLL_STEP,
  DESKTOP_VISIBLE_TESTIMONIALS,
  type CommunityTestimonial,
} from "@/lib/community-testimonials-data";
import { siteContentContainerClass } from "@/lib/site-layout";

const MOBILE_MEDIA = "(max-width: 767px)";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${index < rating ? "text-[#D0AE7D]" : "text-[#E8E3DA]"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: CommunityTestimonial }) {
  return (
    <article className="flex h-full min-h-[200px] flex-col rounded-[20px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:min-h-[220px] sm:p-6">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatarUrl}
            alt=""
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717]">
          {testimonial.name}
        </p>
      </div>
      <p className="mt-4 flex-1 font-[family-name:var(--font-inter)] text-sm leading-[1.65] text-[#5F6557]">
        {testimonial.quote}
      </p>
      <div className="mt-4">
        <StarRating rating={testimonial.rating} />
      </div>
    </article>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const label = direction === "prev" ? "Xem bình luận trước" : "Xem bình luận tiếp theo";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D0AE7D]/50 bg-[#F7F4EE] text-[#1F2717] transition hover:border-[#D0AE7D] hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

function FeatureIcon({ id }: { id: string }) {
  const className = "h-8 w-8 shrink-0 text-[#1F2717]";

  switch (id) {
    case "authentic":
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <circle cx="16" cy="10" r="4" />
          <path strokeLinecap="round" d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          <path strokeLinecap="round" d="M22 8l2-2M24 14h3" />
        </svg>
      );
    case "community":
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <circle cx="11" cy="12" r="3" />
          <circle cx="21" cy="12" r="3" />
          <path strokeLinecap="round" d="M5 24c0-3.3 2.7-6 6-6M21 18c3.3 0 6 2.7 6 6" />
        </svg>
      );
    case "trust":
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path strokeLinejoin="round" d="M16 4l9 4v7c0 5.5-3.8 10.6-9 12-5.2-1.4-9-6.5-9-12V8l9-4z" />
          <path strokeLinecap="round" d="M12 16l3 3 6-6" />
        </svg>
      );
    case "support":
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path strokeLinecap="round" d="M8 14a8 8 0 0116 0v3a3 3 0 01-3 3h-1l-2 4v-5h-1a3 3 0 01-3-3v-3z" />
          <path strokeLinecap="round" d="M12 22h8" />
        </svg>
      );
    default:
      return null;
  }
}

export function CommunityTestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = isMobile ? 1 : DESKTOP_VISIBLE_TESTIMONIALS;
  const scrollStep = isMobile ? 1 : DESKTOP_SCROLL_STEP;
  const maxStart = Math.max(0, communityTestimonials.length - visibleCount);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setStartIndex((index) => Math.min(index, maxStart));
  }, [maxStart]);

  const handlePrev = useCallback(() => {
    setStartIndex((index) => Math.max(0, index - scrollStep));
  }, [scrollStep]);

  const handleNext = useCallback(() => {
    setStartIndex((index) => Math.min(maxStart, index + scrollStep));
  }, [maxStart, scrollStep]);

  const totalTestimonials = communityTestimonials.length;
  const trackWidthPercent = (totalTestimonials / visibleCount) * 100;
  const cardWidthPercent = 100 / totalTestimonials;
  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStart;

  return (
    <section className="bg-[#F7F4EE] pt-7 pb-5 sm:pt-8 sm:pb-6" aria-labelledby="community-testimonials-heading">
      <div className={siteContentContainerClass}>
        <div className="flex items-stretch gap-4 sm:gap-6 lg:gap-8">
          {/* Card cố định — Cộng đồng Danaman */}
          <div className="w-[38%] max-w-[9.5rem] shrink-0 sm:max-w-[11rem] md:max-w-none md:w-[min(240px,34%)] lg:w-[min(280px,32%)] xl:w-[min(300px,28%)]">
            <p className="font-[family-name:var(--font-montserrat)] text-[9px] font-medium uppercase tracking-[0.22em] text-[#D0AE7D] sm:text-[10px] sm:tracking-[0.28em] md:text-xs">
              {communityIntro.label}
            </p>
            <h2
              id="community-testimonials-heading"
              className="mt-2 font-[family-name:var(--font-playfair)] text-base font-medium leading-[1.2] tracking-[-0.5px] text-[#1F2717] sm:mt-3 sm:text-lg md:max-w-xs md:text-xl lg:mt-4 lg:max-w-none lg:text-2xl"
            >
              {communityIntro.headline}
            </h2>
          </div>

          {/* Carousel bình luận + mũi tên */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
            <div className="min-w-0 flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  width: `${trackWidthPercent}%`,
                  transform: `translateX(-${startIndex * cardWidthPercent}%)`,
                }}
              >
                {communityTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`box-border shrink-0 ${index < totalTestimonials - 1 ? "pr-4" : ""}`}
                    style={{ width: `${cardWidthPercent}%` }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:gap-3">
              <CarouselArrow direction="prev" onClick={handlePrev} disabled={!canPrev} />
              <CarouselArrow direction="next" onClick={handleNext} disabled={!canNext} />
            </div>
          </div>
        </div>

        {/* Thanh tính năng */}
        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-[#D0AE7D]/25 pt-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#D0AE7D]/25 lg:pt-6">
          {communityFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex items-center gap-4 ${index > 0 ? "lg:pl-8" : ""} ${index < communityFeatures.length - 1 ? "lg:pr-8" : ""}`}
            >
              <FeatureIcon id={feature.id} />
              <div>
                <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717]">
                  {feature.title}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-xs text-[#5F6557]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
