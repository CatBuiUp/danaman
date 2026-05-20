import { StoryCard } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import type { Story } from "@/types";

type FeaturedStoriesSectionProps = {
  stories: Story[];
};

export function FeaturedStoriesSection({ stories }: FeaturedStoriesSectionProps) {
  return (
    <section id="stories" className="space-y-6">
      <SectionHeading title="Narratives from communities creating change" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
