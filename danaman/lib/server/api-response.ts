import { NextResponse } from "next/server";

export function ok<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function fail(message: string, status = 500, error?: unknown) {
  const details =
    process.env.NODE_ENV === "development" && error instanceof Error
      ? error.message
      : undefined;

  return NextResponse.json(
    {
      success: false,
      message,
      ...(details ? { details } : {}),
    },
    { status },
  );
}
