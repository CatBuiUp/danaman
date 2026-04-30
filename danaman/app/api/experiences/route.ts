import { createResource, listResources } from "@/lib/server/controllers/resource-controller";
import { fail, ok } from "@/lib/server/api-response";

export async function GET() {
  try {
    const experiences = await listResources("experiences");
    return ok(experiences, "Experiences fetched successfully");
  } catch (error) {
    return fail("Failed to fetch experiences", 500, error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;

    if (!payload || typeof payload !== "object") {
      return fail("Invalid request body", 400);
    }

    const experience = await createResource("experiences", payload);
    return ok(experience, "Experience created successfully", 201);
  } catch (error) {
    return fail("Failed to create experience", 500, error);
  }
}
