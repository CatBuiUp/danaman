import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { ActionButtons, ImageGallery, StoryContent } from "@/components/story-detail";
import { ExperienceLandingPage } from "@/components/story-detail/experience-landing";
import { getExperienceLandingContent } from "@/lib/experience-landing-content";
import { isXmlMockStoryInactive, loadActiveStoryRecords } from "@/lib/stories-xml";
import {
  mapStoryToFeaturedExperience,
  resolveFeaturedListIndex,
  type StoryExperienceUi,
} from "@/lib/story-experience-ui";
import { isExperienceLandingStory } from "@/lib/story-ui-type";
import type { Story } from "@/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

type StoryApiResponse = {
  success: boolean;
  message: string;
  data?: Story & { experience?: StoryExperienceUi };
};

async function resolvePublicBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) {
    const proto =
      h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
    return `${proto}://${host}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

async function getStoryDetail(id: string): Promise<(Story & { experience?: StoryExperienceUi }) | null> {
  const baseUrl = await resolvePublicBaseUrl();
  const response = await fetch(`${baseUrl}/api/stories/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as StoryApiResponse;
  return payload.data ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = await getStoryDetail(id);

  if (!story) {
    return { title: "Không tìm thấy | Danaman" };
  }

  return {
    title: `${story.title} | Danaman`,
    description: story.description,
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const story = await getStoryDetail(id);

  if (!story) {
    notFound();
  }

  if (isExperienceLandingStory(story)) {
    const landingContent = getExperienceLandingContent(story.id);
    if (!landingContent) {
      notFound();
    }

    return <ExperienceLandingPage story={story} content={landingContent} />;
  }

  const gallery = story.gallery?.length ? story.gallery : [story.image];
  const paragraphs = story.content?.length ? story.content : [story.description];

  const listStories = loadActiveStoryRecords()
    .map((record) => record.story)
    .filter((s) => !isXmlMockStoryInactive(s.id));
  const featuredIndex = resolveFeaturedListIndex(id, listStories);
  const experience = story.experience ?? mapStoryToFeaturedExperience(story, featuredIndex);

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-[10px] overflow-x-hidden px-6 py-8 sm:px-10 lg:px-16">
      <section className="grid min-w-0 max-w-full gap-8 lg:grid-cols-10">
        <div className="min-w-0 space-y-6 lg:col-span-6">
          <ImageGallery images={gallery} title={story.title} description={story.description} />
          <StoryContent paragraphs={paragraphs} quote={story.quote} />
        </div>

        <aside className="min-w-0 w-full lg:col-span-4">
          <ActionButtons location={story.location} experience={experience} />
        </aside>
      </section>
    </div>
  );
}
