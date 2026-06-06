import { NextResponse } from "next/server";

import { getLikeStatus, incrementLikeWithCooldown } from "@/lib/likes-xml";
import { fail, ok } from "@/lib/server/api-response";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function parseLocationKey(value: string | null): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const locationKey = parseLocationKey(new URL(request.url).searchParams.get("locationKey"));

  if (!id.trim()) {
    return fail("Story id is required", 400);
  }

  if (!locationKey) {
    return fail("Cần quyền truy cập vị trí để tải trạng thái yêu thích.", 400);
  }

  try {
    const status = getLikeStatus(id, locationKey);
    return ok(status, "Like status fetched successfully");
  } catch (error) {
    return fail("Failed to load like status", 500, error);
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id.trim()) {
    return fail("Story id is required", 400);
  }

  let locationKey: string | null = null;
  try {
    const body = (await request.json()) as { locationKey?: string };
    locationKey = parseLocationKey(body.locationKey ?? null);
  } catch {
    return fail("Invalid request body", 400);
  }

  if (!locationKey) {
    return fail("Cần quyền truy cập vị trí để thả tim.", 400);
  }

  try {
    const result = incrementLikeWithCooldown(id, locationKey);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Bạn cần đợi 1 giờ trước khi thả tim lại tại vị trí này.",
          data: result,
        },
        { status: 429 },
      );
    }

    return ok(result, "Like count updated successfully");
  } catch (error) {
    return fail("Failed to update like count", 500, error);
  }
}
