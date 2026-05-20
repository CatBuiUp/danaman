"use client";

import { useCallback, useEffect, useState } from "react";

import {
  DanangStoryCard,
  FeaturedCommunityCtaCard,
  FeaturedExperienceCard,
} from "@/components/cards";
import { ContentSection, SectionHeading } from "@/components/ui";
import { fetchStories } from "@/lib/api/stories-client";
import type { StoryMockRecord } from "@/lib/story-mock-record";
import {
  mapActiveRecordsToStories,
  mapApiStoriesToCards,
  mapStoryToFeaturedCard,
} from "@/lib/story-card-mappers";
import type { StoryExperienceUi } from "@/lib/story-experience-ui";
import type { Story } from "@/types";

const FEATURED_EXPERIENCE_LIMIT = 4;
const DANANG_STORY_LIMIT = 4;

type StoryWithOptionalExperience = Story & { experience?: StoryExperienceUi };

function ExperienceCardSkeleton() {
  return (
    <article className="min-h-[260px] animate-pulse overflow-hidden rounded-[24px] bg-[#E8E3DA] sm:min-h-[300px] lg:min-h-[320px]" />
  );
}

function StoryListCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="aspect-[4/3] animate-pulse bg-[#E8E3DA]" />
      <div className="space-y-2 p-5">
        <div className="h-5 w-4/5 animate-pulse rounded bg-[#E8E3DA]" />
        <div className="h-5 w-3/5 animate-pulse rounded bg-[#E8E3DA]" />
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

  const activeFallback = mapActiveRecordsToStories(
    fallbackStoryRecords.filter((record) => record.active),
  );

  const resolvedStories: Story[] =
    stories.length > 0
      ? stories
      : activeFallback.map((entry) => entry.story);

  const featuredExperiences =
    stories.length > 0
      ? mapApiStoriesToCards(stories).slice(0, FEATURED_EXPERIENCE_LIMIT)
      : activeFallback
          .slice(0, FEATURED_EXPERIENCE_LIMIT)
          .map((entry, index) =>
            mapStoryToFeaturedCard(entry.story, index, entry.experience),
          );

  const danangStories = resolvedStories.slice(0, DANANG_STORY_LIMIT);

  const featuredColumnClass =
    featuredExperiences.length >= 4 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <div className="bg-[#F7F4EE]">
      <ContentSection id="experiences" className="pb-10">
        <SectionHeading
          title="Trải nghiệm nổi bật"
          viewAllHref="#stories"
          viewAllLabel="Xem tất cả trải nghiệm →"
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

        <div className={`grid grid-cols-1 gap-6 ${featuredColumnClass}`}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ExperienceCardSkeleton key={index} />
              ))
            : [
                ...featuredExperiences.map((experience) => (
                  <FeaturedExperienceCard key={experience.id} experience={experience} />
                )),
                <FeaturedCommunityCtaCard key="featured-community-cta" />,
              ]}
        </div>
      </ContentSection>

      <ContentSection id="stories" className="pt-10">
        <SectionHeading
          title="Câu chuyện Đà Nẵng"
          viewAllHref="#stories"
          viewAllLabel="Xem tất cả câu chuyện →"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <StoryListCardSkeleton key={index} />)
            : danangStories.map((story) => <DanangStoryCard key={story.id} story={story} />)}
        </div>
      </ContentSection>
    </div>
  );
}
