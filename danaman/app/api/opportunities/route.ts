import { getOpportunities } from "@/lib/api/client";
import { fail, ok } from "@/lib/server/api-response";

export async function GET() {
  try {
    const { data } = await getOpportunities();
    return ok(data, "Opportunities fetched successfully");
  } catch (error) {
    return fail("Failed to fetch opportunities", 500, error);
  }
}

export async function POST() {
  return fail("Opportunity creation is not supported without a database.", 501);
}
