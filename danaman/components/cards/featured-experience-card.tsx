"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LIKE_COOLDOWN_SECONDS, resolveLocationKey } from "@/lib/like-location";
import { formatPriceVnd, type FeaturedExperienceCardData } from "@/lib/story-card-mappers";

type LikeApiData = {
  likeCount?: number;
  canLike?: boolean;
  cooldownActive?: boolean;
  retryAfterSeconds?: number;
};

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
  const [likeCount, setLikeCount] = useState(0);
  const [locationKey, setLocationKey] = useState<string | null>(null);
  const [canLike, setCanLike] = useState(false);
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);
  const [isLoadingLikes, setIsLoadingLikes] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const resolvedLocationKey = await resolveLocationKey();
      if (cancelled) return;

      if (!resolvedLocationKey) {
        setLocationKey(null);
        setCanLike(false);
        setIsLoadingLikes(false);
        return;
      }

      setLocationKey(resolvedLocationKey);

      try {
        const response = await fetch(
          `/api/likes/${experience.id}?locationKey=${encodeURIComponent(resolvedLocationKey)}`,
        );
        const json = (await response.json()) as {
          success?: boolean;
          data?: LikeApiData;
        };
        if (!cancelled && json.success && json.data) {
          setLikeCount(json.data.likeCount ?? 0);
          setCanLike(json.data.canLike ?? true);
          setRetryAfterSeconds(json.data.retryAfterSeconds ?? 0);
        }
      } catch {
        // Giữ mặc định khi không tải được.
      } finally {
        if (!cancelled) setIsLoadingLikes(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [experience.id]);

  useEffect(() => {
    if (retryAfterSeconds <= 0) {
      if (locationKey) {
        setCanLike(true);
      }
      return;
    }

    setCanLike(false);
    const timer = window.setInterval(() => {
      setRetryAfterSeconds((current) => {
        if (current <= 1) {
          setCanLike(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [retryAfterSeconds, locationKey]);

  async function handleHeartClick() {
    if (isSaving || !canLike || !locationKey) return;

    const optimisticCount = likeCount + 1;
    setLikeCount(optimisticCount);
    setCanLike(false);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/likes/${experience.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationKey }),
      });
      const json = (await response.json()) as {
        success?: boolean;
        message?: string;
        data?: LikeApiData;
      };

      if (json.success && json.data) {
        setLikeCount(json.data.likeCount ?? optimisticCount);
        setRetryAfterSeconds(LIKE_COOLDOWN_SECONDS);
      } else {
        setLikeCount(json.data?.likeCount ?? likeCount);
        setRetryAfterSeconds(json.data?.retryAfterSeconds ?? 0);
        setCanLike(!(json.data?.cooldownActive ?? false));
      }
    } catch {
      setLikeCount((current) => Math.max(0, current - 1));
      setCanLike(true);
    } finally {
      setIsSaving(false);
    }
  }

  const heartDisabled = isSaving || isLoadingLikes || !canLike || !locationKey;

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

      <div className="absolute top-4 right-4 z-20 flex w-9 flex-col items-center gap-1">
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
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
