import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { ActionButtons, AuthorCard, ImageGallery, StoryContent } from "@/components/story-detail";
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
  const tags = story.tags?.join(" • ") ?? "Storytelling • Community";

  return (
    <div className="space-y-10 px-6 py-8 sm:px-10 lg:px-16">
      <section className="grid gap-8 lg:grid-cols-10">
        <div className="lg:col-span-7">
          <ImageGallery images={gallery} title={story.title} />
        </div>

        <aside className="space-y-5 lg:col-span-3">
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {story.category}
          </span>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900">{story.title}</h1>
          <AuthorCard
            author={story.author}
            avatar={story.authorAvatar ?? story.image}
            date={story.publishedAt ?? "N/A"}
          />

          <p className="line-clamp-4 text-sm leading-6 text-zinc-600">{story.description}</p>

          <div className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            <p>
              <span className="font-semibold text-zinc-900">Dia diem:</span> {story.location}
            </p>
            <p>
              <span className="font-semibold text-zinc-900">Tags:</span> {tags}
            </p>
            <p>
              <span className="font-semibold text-zinc-900">Nhom ket noi:</span>{" "}
              {story.connectionGroup ?? "Danaman Community"}
            </p>
          </div>
        </aside>
      </section>

      <div className="flex flex-col gap-[3px]">
        <StoryContent paragraphs={paragraphs} quote={story.quote} />
        <ActionButtons />
      </div>
    </div>
  );
}
