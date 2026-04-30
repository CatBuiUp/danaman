import type { Story } from "@/types";

type StoriesApiResponse = {
  success?: boolean;
  message?: string;
  data?: Story[];
};

export async function fetchStories(): Promise<Story[]> {
  const response = await fetch("/api/stories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as StoriesApiResponse;

  if (!response.ok || !payload.data) {
    throw new Error(payload.message ?? "Failed to fetch stories");
  }

  return payload.data;
}
