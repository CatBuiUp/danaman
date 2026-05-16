import type { StoryExperienceUi } from "@/lib/story-experience-ui";
import type { Story } from "@/types";

export type StoryMockRecord = {
  active: boolean;
  story: Story;
  experience: StoryExperienceUi;
};
