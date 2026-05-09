import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { ActionButtons, ImageGallery, StoryContent } from "@/components/story-detail";
import { listResources } from "@/lib/server/controllers/resource-controller";
import {
  mapStoryToFeaturedExperience,
  resolveFeaturedListIndex,
} from "@/lib/story-experience-ui";
import type { Story } from "@/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

type StoryApiResponse = {
  success: boolean;
  message: string;
  data?: Story;
};

/** Base URL for server-side fetch to this app's API (NEXTAUTH_URL is often unset on Vercel). */
async function resolvePublicBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) {
    const proto =
      h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
    return `${proto}://${host}`;
  }
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

async function getStoryDetail(id: string): Promise<Story | null> {
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

export default async function StoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const story = await getStoryDetail(id);

  if (!story) {
    notFound();
  }

  const gallery = story.gallery?.length ? story.gallery : [story.image];
  const paragraphs = story.content?.length ? story.content : [story.description];

  let listStories: { id: string }[] = [];
  try {
    listStories = (await listResources("stories")) as Story[];
  } catch {
    listStories = [];
  }
  const featuredIndex = resolveFeaturedListIndex(id, listStories);
  const experience = mapStoryToFeaturedExperience(story, featuredIndex);

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-[10px] overflow-x-hidden px-6 py-8 sm:px-10 lg:px-16">
      <section className="grid min-w-0 max-w-full gap-8 lg:grid-cols-10">
        <div className="min-w-0 space-y-6 lg:col-span-7">
          <ImageGallery images={gallery} title={story.title} description={story.description} />
          <StoryContent paragraphs={paragraphs} quote={story.quote} />
        </div>

        <aside className="min-w-0 w-full lg:col-span-3">
          <ActionButtons location={story.location} experience={experience} />
        </aside>
      </section>
    </div>
  );
}
