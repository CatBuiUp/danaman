"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";
import { useStories } from "@/lib/hooks/use-stories";
import type { Story } from "@/types";

type GroupSize = "Nhóm nhỏ" | "Nhóm vừa" | "Nhóm lớn";

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

const MOCK_STORIES: FeaturedStoryCardData[] = [
  {
    id: "mock-story-1",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
    category: "Ngư dân",
    title: "Ra khơi cùng ngư dân",
    duration: "4 - 6 tiếng",
    groupSize: "Nhóm nhỏ",
    pricePerPerson: 530000,
    rating: 4.9,
    reviewCount: 152,
  },
  {
    id: "mock-story-2",
    image:
      "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=1200&q=80",
    category: "Làng chài",
    title: "Khám phá nhịp sống miền biển",
    duration: "3 - 5 tiếng",
    groupSize: "Nhóm vừa",
    pricePerPerson: 450000,
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "mock-story-3",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80",
    category: "Ẩm thực",
    title: "Bữa cơm cùng người địa phương",
    duration: "2 - 3 tiếng",
    groupSize: "Nhóm nhỏ",
    pricePerPerson: 390000,
    rating: 4.7,
    reviewCount: 76,
  },
  {
    id: "mock-story-4",
    image:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    category: "Thiên nhiên",
    title: "Du ngoạn bình minh trên vịnh",
    duration: "5 - 7 tiếng",
    groupSize: "Nhóm lớn",
    pricePerPerson: 610000,
    rating: 4.9,
    reviewCount: 214,
  },
  {
    id: "mock-story-5",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    category: "Khám phá",
    title: "Đi thuyền ngắm hoàng hôn",
    duration: "2 - 4 tiếng",
    groupSize: "Nhóm vừa",
    pricePerPerson: 420000,
    rating: 4.6,
    reviewCount: 63,
  },
  {
    id: "mock-story-6",
    image:
      "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=80",
    category: "Ngư dân",
    title: "Một ngày làm ngư phủ",
    duration: "6 - 8 tiếng",
    groupSize: "Nhóm nhỏ",
    pricePerPerson: 680000,
    rating: 4.8,
    reviewCount: 121,
  },
  {
    id: "mock-story-7",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    category: "Biển đảo",
    title: "Tour trải nghiệm ven biển",
    duration: "3 - 6 tiếng",
    groupSize: "Nhóm lớn",
    pricePerPerson: 500000,
    rating: 4.7,
    reviewCount: 87,
  },
  {
    id: "mock-story-8",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    category: "Địa phương",
    title: "Gặp gỡ người giữ hồn làng chài",
    duration: "4 - 5 tiếng",
    groupSize: "Nhóm vừa",
    pricePerPerson: 470000,
    rating: 4.9,
    reviewCount: 143,
  },
];

function formatPriceVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

function mapStoryToCardData(story: Story, index: number): FeaturedStoryCardData {
  const groupSizes: GroupSize[] = ["Nhóm nhỏ", "Nhóm vừa", "Nhóm lớn"];
  const duration = story.readTime.replace("phút đọc", "tiếng");

  return {
    id: story.id,
    image: story.image,
    category: story.category || "Trải nghiệm",
    title: story.title,
    duration: duration || "3 - 4 tiếng",
    groupSize: groupSizes[index % groupSizes.length],
    pricePerPerson: 350000 + index * 35000,
    rating: 4.6 + (index % 4) * 0.1,
    reviewCount: 60 + index * 12,
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
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
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
    stories.length > 0 ? stories.slice(0, 8).map(mapStoryToCardData) : MOCK_STORIES;

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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <StoryCardSkeleton key={index} />)
          : storiesToRender.slice(0, 8).map((story) => <FeaturedStoryCard key={story.id} story={story} />)}
      </div>
    </section>
  );
}
