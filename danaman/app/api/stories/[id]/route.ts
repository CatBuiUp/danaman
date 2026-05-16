import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getMockStoryRecordById, isXmlMockStoryInactive } from "@/lib/stories-xml";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const story = await prisma.story.findUnique({
      where: { id },
    });

    if (story && !isXmlMockStoryInactive(story.id)) {
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

  const mockRecord = getMockStoryRecordById(id);
  if (mockRecord) {
    return NextResponse.json({
      success: true,
      message: "Mock story fetched successfully",
      data: {
        ...mockRecord.story,
        experience: mockRecord.experience,
      },
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
