import { NextResponse } from "next/server";

import { getMockStoryRecordById } from "@/lib/stories-xml";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;

  const mockRecord = getMockStoryRecordById(id);
  if (mockRecord) {
    return NextResponse.json({
      success: true,
      message: "Story fetched successfully",
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
