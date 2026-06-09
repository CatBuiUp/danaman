import { CHU_MUOI_HERO_IMAGE } from "@/lib/landing-images";
import type { StoryMockRecord } from "@/lib/story-mock-record";
import { mapStoryToFeaturedCard } from "@/lib/story-card-mappers";
import type { StoryExperienceUi } from "@/lib/story-experience-ui";
import type { Story } from "@/types";

export const HOME_FEATURED_EXPERIENCE_ID = "mock-story-1";

export const HOME_PARTNERSHIP_IMAGE = "/stories/bua-com-lang-chai-0.jpg";

export type FeaturedExperienceRowCardData = {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  groupSize: string;
  location: string;
  pricePerPerson: number;
  rating: number;
  reviewCount: number;
};

const HOME_DISPLAY_OVERRIDES: Partial<FeaturedExperienceRowCardData> = {
  image: CHU_MUOI_HERO_IMAGE,
  title: "Giữ Mùi Biển",
  description:
    "Trải nghiệm làm nước mắm truyền thống cùng Người Giữ Hồn Biển tại làng biển Tân Thái.",
  duration: "3 – 4 tiếng",
  location: "Tân Thái, Đà Nẵng",
  pricePerPerson: 480_000,
};

type StoryWithOptionalExperience = Story & { experience?: StoryExperienceUi };

export function mapStoryToFeaturedRowCard(
  story: Story,
  index: number,
  experienceOverride?: StoryExperienceUi,
): FeaturedExperienceRowCardData {
  const base = mapStoryToFeaturedCard(story, index, experienceOverride);
  const overrides = story.id === HOME_FEATURED_EXPERIENCE_ID ? HOME_DISPLAY_OVERRIDES : {};

  return {
    id: base.id,
    image: overrides.image ?? base.image,
    category: base.category,
    title: overrides.title ?? base.title,
    description: story.description,
    duration: overrides.duration ?? base.duration,
    groupSize: base.groupSize,
    location: overrides.location ?? story.location,
    pricePerPerson: overrides.pricePerPerson ?? base.pricePerPerson,
    rating: base.rating,
    reviewCount: base.reviewCount,
  };
}

export function resolveHomeFeaturedExperience(
  stories: Story[],
  fallbackRecords: StoryMockRecord[],
): FeaturedExperienceRowCardData | null {
  if (stories.length > 0) {
    const story = stories.find((entry) => entry.id === HOME_FEATURED_EXPERIENCE_ID);
    if (story) {
      const experience = (story as StoryWithOptionalExperience).experience;
      const index = stories.findIndex((entry) => entry.id === HOME_FEATURED_EXPERIENCE_ID);
      return mapStoryToFeaturedRowCard(story, index, experience);
    }
  }

  const fallback = fallbackRecords.find(
    (record) => record.active && record.story.id === HOME_FEATURED_EXPERIENCE_ID,
  );
  if (!fallback) return null;

  return mapStoryToFeaturedRowCard(fallback.story, 0, fallback.experience);
}
