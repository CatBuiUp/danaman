"use client";

import { useRouter } from "next/navigation";

type ActionButtonsProps = {
  storyId: string;
};

export function ActionButtons({ storyId }: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => {
          console.log("Ket noi story:", storyId);
        }}
        className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
      >
        Ket noi
      </button>
      <button
        type="button"
        onClick={() => router.back()}
        className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
      >
        Thoat
      </button>
    </div>
  );
}
