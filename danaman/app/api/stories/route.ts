import { fail, ok } from "@/lib/server/api-response";
import { isXmlMockStoryInactive, loadActiveStoryRecords } from "@/lib/stories-xml";

export async function GET() {
  try {
    const fromXml = loadActiveStoryRecords()
      .filter((record) => !isXmlMockStoryInactive(record.story.id))
      .map((record) => ({
        ...record.story,
        experience: record.experience,
      }));

    return ok(fromXml, "Stories fetched successfully");
  } catch (error) {
    return fail("Failed to fetch stories", 500, error);
  }
}

export async function POST() {
  return fail("Story creation is not supported without a database.", 501);
}
