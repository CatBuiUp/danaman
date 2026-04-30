import { NextResponse } from "next/server";

import type { ApiResponse } from "@/types";

export async function GET() {
  const response: ApiResponse<{ status: "ok" }> = {
    data: { status: "ok" },
    message: "Service is healthy",
  };

  return NextResponse.json(response);
}
