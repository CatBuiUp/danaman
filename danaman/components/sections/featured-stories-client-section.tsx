"use client";

import Image from "next/image";
import Link from "next/link";
import { FeaturedCommunityCtaCard } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import { useStories } from "@/lib/hooks/use-stories";
import { STORY_DETAILS_MOCK } from "@/lib/stories-detail-mock-data";
import { mapStoryToFeaturedExperience, type GroupSize } from "@/lib/story-experience-ui";
import type { Story } from "@/types";

type FeaturedStoryCardData = {
  id: string;
  image: string;
  category: string;
  title: string;
  duration: string;
  groupSize: GroupSize;
  pricePerPerson: number;
  rating: number;
  reviewCount: number;
};

function formatPriceVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

function mapStoryToCardData(story: Story, index: number): FeaturedStoryCardData {
  const xp = mapStoryToFeaturedExperience(story, index);

  return {
    id: story.id,
    image: story.image,
    category: story.category || "Trải nghiệm",
    title: story.title,
    duration: xp.durationLabel,
    groupSize: xp.groupSize,
    pricePerPerson: xp.pricePerPerson,
    rating: xp.rating,
    reviewCount: xp.reviewCount,
  };
}

function StoryCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <div className="h-[320px] w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
    </article>
  );
}

function FeaturedStoryCard({ story }: { story: FeaturedStoryCardData }) {
  return (
    <article className="group relative h-[320px] overflow-hidden rounded-2xl border border-black/10 shadow-md dark:border-white/10">
      <Image
        src={story.image}
        alt={story.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071a2f]/95 via-[#071a2f]/65 to-[#071a2f]/20" />

      <div className="relative z-10 flex h-full flex-col p-4 text-white">
        <span className="inline-flex w-fit rounded-lg bg-emerald-900/90 px-2.5 py-1 text-xs font-semibold">
          {story.category}
        </span>

        <div className="mt-auto space-y-2.5">
          <h3 className="text-2xl font-bold leading-tight">{story.title}</h3>

          <p className="flex items-center gap-4 text-sm text-zinc-100/95">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>◷</span>
              {story.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>👥</span>
              {story.groupSize}
            </span>
          </p>

          <p className="text-[1.35rem] font-bold leading-none text-amber-300">
            {formatPriceVnd(story.pricePerPerson)}
            <span className="ml-1 text-lg font-medium text-zinc-100">/ người</span>
          </p>

          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-100">
              <span className="text-amber-300" aria-hidden>
                ★
              </span>
              {story.rating.toFixed(1)} ({story.reviewCount})
            </p>
            <Link
              href={`/stories/${story.id}`}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedStoriesClientSection() {
  const { stories, isLoading, error, reload } = useStories();
  const storiesToRender: FeaturedStoryCardData[] =
    stories.length > 0
      ? stories.slice(0, 7).map(mapStoryToCardData)
      : STORY_DETAILS_MOCK.slice(0, 7).map(mapStoryToCardData);

  return (
    <section id="stories" className="space-y-6">
      <SectionHeading
        eyebrow=""
        title="Câu chuyện mới nhất"
        description=""
      />

      {error && stories.length > 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm dark:border-red-900 dark:bg-red-950/30">
          <p className="font-medium text-red-700 dark:text-red-300">
            Could not load stories right now.
          </p>
          <p className="mt-1 text-red-600/90 dark:text-red-300/90">{error}</p>
          <button
            type="button"
            onClick={() => void reload()}
            className="mt-4 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
          >
            Try again
          </button>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <StoryCardSkeleton key={index} />)
          : [
              ...storiesToRender.map((story) => (
                <FeaturedStoryCard key={story.id} story={story} />
              )),
              <FeaturedCommunityCtaCard key="featured-community-cta" />,
            ]}
      </div>
    </section>
  );
}
