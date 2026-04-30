import { createResource, listResources } from "@/lib/server/controllers/resource-controller";
import { fail, ok } from "@/lib/server/api-response";

export async function GET() {
  try {
    const opportunities = await listResources("opportunities");
    return ok(opportunities, "Opportunities fetched successfully");
  } catch (error) {
    return fail("Failed to fetch opportunities", 500, error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;

    if (!payload || typeof payload !== "object") {
      return fail("Invalid request body", 400);
    }

    const opportunity = await createResource("opportunities", payload);
    return ok(opportunity, "Opportunity created successfully", 201);
  } catch (error) {
    return fail("Failed to create opportunity", 500, error);
  }
}
