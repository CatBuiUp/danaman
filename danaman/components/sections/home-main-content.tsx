"use client";

import { useCallback, useEffect, useState } from "react";

import { FeaturedExperienceRowCard, FeaturedPartnershipCard } from "@/components/cards";
import { DongHanhSection } from "@/components/sections/dong-hanh-section";
import { ContentSection, SectionHeading } from "@/components/ui";
import { fetchStories } from "@/lib/api/stories-client";
import { resolveHomeFeaturedExperience } from "@/lib/home-featured-experience";
import type { StoryMockRecord } from "@/lib/story-mock-record";
import type { Story } from "@/types";

function ExperienceRowSkeleton() {
  return (
    <article className="overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col sm:flex-row">
        <div className="min-h-[220px] w-full animate-pulse bg-[#E8E3DA] sm:min-h-[280px] sm:w-[42%]" />
        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="h-7 w-2/3 animate-pulse rounded bg-[#E8E3DA]" />
          <div className="h-4 w-full animate-pulse rounded bg-[#E8E3DA]" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-[#E8E3DA]" />
        </div>
      </div>
    </article>
  );
}

type HomeMainContentProps = {
  fallbackStoryRecords: StoryMockRecord[];
};

export function HomeMainContent({ fallbackStoryRecords }: HomeMainContentProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadStories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchStories();
      setStories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error while loading stories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadStories();
  }, [loadStories]);

  const featuredExperience = resolveHomeFeaturedExperience(stories, fallbackStoryRecords);

  return (
    <div className="bg-[#F7F4EE]">
      <ContentSection id="experiences" className="pt-10 pb-5">
        <SectionHeading
          title="Trải nghiệm nổi bật"
          viewAllHref="#stories"
          viewAllLabel="Xem tất cả trải nghiệm →"
          className="!mb-4 sm:!mb-5"
        />

        {error && stories.length === 0 ? (
          <div className="mb-6 rounded-[24px] border border-[#D0AE7D]/40 bg-white p-5 font-[family-name:var(--font-inter)] text-sm text-[#5F6557]">
            <p>Không tải được dữ liệu. Đang hiển thị nội dung dự phòng.</p>
            <button
              type="button"
              onClick={() => void loadStories()}
              className="mt-3 rounded-2xl border border-[#D0AE7D] px-4 py-2 text-sm font-semibold text-[#1F2717] transition hover:bg-[#D0AE7D]/15"
            >
              Thử lại
            </button>
          </div>
        ) : null}

        <div className="flex flex-col gap-6">
          {isLoading ? (
            <>
              <ExperienceRowSkeleton />
              <ExperienceRowSkeleton />
            </>
          ) : (
            <>
              {featuredExperience ? (
                <FeaturedExperienceRowCard experience={featuredExperience} />
              ) : null}
              <FeaturedPartnershipCard />
            </>
          )}
        </div>
      </ContentSection>

      <DongHanhSection />
    </div>
  );
}
