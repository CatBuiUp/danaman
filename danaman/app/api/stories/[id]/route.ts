import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { STORY_DETAILS_MOCK } from "@/lib/stories-detail-mock-data";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function getMockStoryById(id: string) {
  return STORY_DETAILS_MOCK.find((story) => story.id === id);
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const story = await prisma.story.findUnique({
      where: { id },
    });

    if (story) {
      return NextResponse.json({
        success: true,
        message: "Story fetched successfully",
        data: {
          ...story,
          gallery: [story.image],
          content: [story.description],
          authorAvatar: story.image,
          publishedAt: new Date(story.createdAt).toLocaleDateString("vi-VN"),
          tags: [story.category],
          connectionGroup: "Danaman Community",
        },
      });
    }
  } catch {
    // Ignore Prisma runtime errors in local/dev and fallback to mock.
  }

  const mockStory = getMockStoryById(id);
  if (mockStory) {
    return NextResponse.json({
      success: true,
      message: "Mock story fetched successfully",
      data: mockStory,
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Story not found",
    },
    { status: 404 },
  );
}
