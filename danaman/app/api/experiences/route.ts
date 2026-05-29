import { getExperiences } from "@/lib/api/client";
import { fail, ok } from "@/lib/server/api-response";

export async function GET() {
  try {
    const { data } = await getExperiences();
    return ok(data, "Experiences fetched successfully");
  } catch (error) {
    return fail("Failed to fetch experiences", 500, error);
  }
}

export async function POST() {
  return fail("Experience creation is not supported without a database.", 501);
}
