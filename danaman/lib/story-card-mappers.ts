import type { StoryMockRecord } from "@/lib/story-mock-record";
import { mapStoryToFeaturedExperience, type GroupSize, type StoryExperienceUi } from "@/lib/story-experience-ui";
import type { Story } from "@/types";

export type FeaturedExperienceCardData = {
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

type StoryWithOptionalExperience = Story & { experience?: StoryExperienceUi };

export function formatPriceVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

export function mapStoryToFeaturedCard(
  story: Story,
  index: number,
  experienceOverride?: StoryExperienceUi,
): FeaturedExperienceCardData {
  const xp = experienceOverride ?? mapStoryToFeaturedExperience(story, index);

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

export function mapActiveRecordsToStories(
  records: StoryMockRecord[],
): { story: Story; experience?: StoryExperienceUi }[] {
  return records.filter((r) => r.active).map((r) => ({
    story: r.story,
    experience: r.experience,
  }));
}

export function mapApiStoriesToCards(stories: Story[]): FeaturedExperienceCardData[] {
  return stories.map((story, index) => {
    const experience = (story as StoryWithOptionalExperience).experience;
    return mapStoryToFeaturedCard(story, index, experience);
  });
}
