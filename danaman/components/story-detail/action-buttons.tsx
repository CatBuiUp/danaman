"use client";

import { useRouter } from "next/navigation";

import { storyDetailConnectUrl } from "@/lib/footer-social-links";

export function ActionButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-3 w-full">
      <a
        href={storyDetailConnectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-500"
      >
        Kết nối
      </a>
      <button
        type="button"
        onClick={() => router.back()}
        className="w-full rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
      >
        Thoát
      </button>
    </div>
  );
}
