import { getLikeStatus, incrementLikeCount } from "@/lib/likes-xml";
import { fail, ok } from "@/lib/server/api-response";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id.trim()) {
    return fail("Story id is required", 400);
  }

  try {
    const status = await getLikeStatus(id);
    return ok(status, "Like status fetched successfully");
  } catch (error) {
    return fail("Failed to load like status", 500, error);
  }
}

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id.trim()) {
    return fail("Story id is required", 400);
  }

  try {
    const result = await incrementLikeCount(id);
    return ok(result, "Like count updated successfully");
  } catch (error) {
    return fail("Failed to update like count", 500, error);
  }
}
