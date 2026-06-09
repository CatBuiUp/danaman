"use client";

import Image from "next/image";
import Link from "next/link";

import { useExperienceLike } from "@/lib/hooks/use-experience-like";
import { formatPriceVnd } from "@/lib/story-card-mappers";
import type { FeaturedExperienceRowCardData } from "@/lib/home-featured-experience";

type FeaturedExperienceRowCardProps = {
  experience: FeaturedExperienceRowCardData;
};

function IconClock() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#5F6557]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#5F6557]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4 19a5 5 0 0 1 10 0M14 19a4 4 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#5F6557]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function FeaturedExperienceRowCard({ experience }: FeaturedExperienceRowCardProps) {
  const { likeCount, canLike, heartDisabled, handleHeartClick } = useExperienceLike(experience.id);

  return (
    <article className="overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col sm:flex-row">
        <div className="relative min-h-[220px] w-full shrink-0 sm:min-h-[280px] sm:w-[42%]">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 42vw"
          />

          <span className="absolute top-4 left-4 z-10 rounded-full bg-[#1F2717]/80 px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-medium text-white backdrop-blur-sm">
            {experience.category}
          </span>

          <div className="absolute top-4 right-4 z-10 flex w-9 flex-col items-center gap-1">
            <button
              type="button"
              aria-label={canLike ? "Thêm vào yêu thích" : "Chưa thể thả tim"}
              aria-pressed={likeCount > 0}
              onClick={() => void handleHeartClick()}
              disabled={heartDisabled}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/70 backdrop-blur-sm transition hover:bg-black/30 disabled:cursor-not-allowed disabled:opacity-60 ${
                likeCount > 0 ? "bg-rose-500/80 text-white" : "bg-black/15 text-white"
              }`}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill={likeCount > 0 ? "currentColor" : "none"}
                aria-hidden
              >
                <path
                  d="M12 20.5s-6.5-4.2-8.8-8.1C1.2 8.8 3.6 5 7.2 5c2 0 3.2 1.2 4.8 3.2C13.6 6.2 14.8 5 16.8 5c3.6 0 6 3.8 4 7.4C18.5 16.3 12 20.5 12 20.5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <span
              aria-live="polite"
              className="w-full text-center font-[family-name:var(--font-inter)] text-xs font-semibold text-white drop-shadow"
            >
              {likeCount}
            </span>
          </div>

          <p className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm font-medium text-white drop-shadow">
            <span className="text-[#D0AE7D]" aria-hidden>
              ★
            </span>
            {experience.rating.toFixed(1)} ({experience.reviewCount})
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.15] tracking-[-0.5px] text-[#1F2717] sm:text-[1.65rem]">
              {experience.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-base leading-[1.65] text-[#5F6557] sm:text-lg">
              {experience.description}
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-[family-name:var(--font-inter)] text-base text-[#5F6557] sm:text-lg">
              <span className="inline-flex items-center gap-1.5">
                <IconClock />
                {experience.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconPeople />
                {experience.groupSize}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconLocation />
                {experience.location}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="font-[family-name:var(--font-inter)] text-lg font-semibold text-[#1F2717]">
              {formatPriceVnd(experience.pricePerPerson)}
              <span className="ml-1 text-sm font-normal text-[#5F6557]">/ người</span>
            </p>
            <Link
              href={`/stories/${experience.id}`}
              className="shrink-0 rounded-2xl bg-[#D0AE7D] px-5 py-2.5 font-[family-name:var(--font-inter)] text-base font-semibold text-[#1F2717] transition hover:bg-[#e0c090]"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
