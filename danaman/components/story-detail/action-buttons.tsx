"use client";

import { useRouter } from "next/navigation";

type ActionButtonsProps = {
  storyId: string;
};

export function ActionButtons({ storyId }: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-3 w-full">
      <button
        type="button"
        onClick={() => {
          console.log("Ket noi story:", storyId);
        }}
        className="w-full rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
      >
        Kết nối
      </button>
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
