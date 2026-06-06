import type { Story } from "@/types";

/** Layout trang chi tiết story/experience. Mở rộng khi cần custom UI khác. */
export type StoryUiType = "default" | "experience-landing";

export const STORY_UI_TYPES = {
  DEFAULT: "default",
  EXPERIENCE_LANDING: "experience-landing",
} as const satisfies Record<string, StoryUiType>;

/** Story id dùng layout experience-landing (đồng bộ với UiType trong XML). */
export const EXPERIENCE_LANDING_STORY_IDS = new Set<string>(["mock-story-1"]);

export function resolveStoryUiType(story: Pick<Story, "id" | "uiType">): StoryUiType {
  if (story.uiType) return story.uiType;
  if (EXPERIENCE_LANDING_STORY_IDS.has(story.id)) return STORY_UI_TYPES.EXPERIENCE_LANDING;
  return STORY_UI_TYPES.DEFAULT;
}

export function isExperienceLandingStory(story: Pick<Story, "id" | "uiType">): boolean {
  return resolveStoryUiType(story) === STORY_UI_TYPES.EXPERIENCE_LANDING;
}

export function isExperienceLandingPath(pathname: string): boolean {
  const match = pathname.match(/^\/stories\/([^/?#]+)\/?$/);
  if (!match) return false;
  return EXPERIENCE_LANDING_STORY_IDS.has(match[1]);
}
