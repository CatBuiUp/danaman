import { createResource, listResources } from "@/lib/server/controllers/resource-controller";
import { fail, ok } from "@/lib/server/api-response";

export async function GET() {
  try {
    const stories = await listResources("stories");
    return ok(stories, "Stories fetched successfully");
  } catch (error) {
    return fail("Failed to fetch stories", 500, error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;

    if (!payload || typeof payload !== "object") {
      return fail("Invalid request body", 400);
    }

    const story = await createResource("stories", payload);
    return ok(story, "Story created successfully", 201);
  } catch (error) {
    return fail("Failed to create story", 500, error);
  }
}
