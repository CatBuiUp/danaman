import Image from "next/image";
import Link from "next/link";

import { formatPriceVnd, type FeaturedExperienceCardData } from "@/lib/story-card-mappers";

type FeaturedExperienceCardProps = {
  experience: FeaturedExperienceCardData;
};

function IconClock() {
  return (
    <svg className="h-4 w-4 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg className="h-4 w-4 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4 19a5 5 0 0 1 10 0M14 19a4 4 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FeaturedExperienceCard({ experience }: FeaturedExperienceCardProps) {
  return (
    <article className="group relative min-h-[260px] overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:min-h-[300px] lg:min-h-[320px]">
      <Image
        src={experience.image}
        alt={experience.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 240px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F2717]/95 via-[#1F2717]/45 to-[#1F2717]/10" />

      <button
        type="button"
        aria-label="Thêm vào yêu thích"
        className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-black/15 text-white backdrop-blur-sm transition hover:bg-black/30"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 20.5s-6.5-4.2-8.8-8.1C1.2 8.8 3.6 5 7.2 5c2 0 3.2 1.2 4.8 3.2C13.6 6.2 14.8 5 16.8 5c3.6 0 6 3.8 4 7.4C18.5 16.3 12 20.5 12 20.5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <div className="relative z-10 flex h-full min-h-[260px] flex-col p-4 text-white sm:min-h-[300px] lg:min-h-[320px]">
        <span className="inline-flex w-fit rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {experience.category}
        </span>

        <div className="mt-auto space-y-3 pt-6">
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium leading-[1.2] tracking-[-0.5px] sm:text-2xl">
            {experience.title}
          </h3>

          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-[#EEDBC0]/95">
            <span className="inline-flex items-center gap-1.5">
              <IconClock />
              {experience.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconPeople />
              {experience.groupSize}
            </span>
          </p>

          <p className="font-[family-name:var(--font-inter)] text-lg font-semibold leading-none text-[#D0AE7D]">
            {formatPriceVnd(experience.pricePerPerson)}
            <span className="ml-1 text-sm font-normal text-[#EEDBC0]/90">/ người</span>
          </p>

          <div className="flex items-end justify-between gap-3 pt-1">
            <p className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm text-[#EEDBC0]">
              <span className="text-[#D0AE7D]" aria-hidden>
                ★
              </span>
              {experience.rating.toFixed(1)} ({experience.reviewCount})
            </p>
            <Link
              href={`/stories/${experience.id}`}
              className="shrink-0 rounded-2xl bg-[#D0AE7D] px-4 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717] transition hover:bg-[#e0c090]"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
