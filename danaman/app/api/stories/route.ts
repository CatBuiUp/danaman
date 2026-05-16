import { createResource, listResources } from "@/lib/server/controllers/resource-controller";
import { fail, ok } from "@/lib/server/api-response";
import { isXmlMockStoryInactive, loadActiveStoryRecords } from "@/lib/stories-xml";

export async function GET() {
  try {
    const stories = await listResources("stories");
    if (Array.isArray(stories) && stories.length > 0) {
      const filtered = stories.filter((row) => {
        const id = typeof (row as { id?: unknown }).id === "string" ? (row as { id: string }).id : "";
        return !id || !isXmlMockStoryInactive(id);
      });
      return ok(filtered, "Stories fetched successfully");
    }
  } catch {
    // Fallback to XML mock when DB is empty or Prisma is unavailable.
  }

  try {
    const fromXml = loadActiveStoryRecords().map((r) => ({
      ...r.story,
      experience: r.experience,
    }));
    return ok(fromXml, "Stories fetched successfully");
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
