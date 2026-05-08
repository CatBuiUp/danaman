"use client";

import { useRouter } from "next/navigation";

import { storyDetailConnectUrl } from "@/lib/footer-social-links";

type ActionButtonsProps = {
  location: string;
  duration: string;
  timeRange: string;
  group: string;
};

const departureDates = ["T2 20/05", "T3 21/05", "T4 22/05", "T5 23/05", "T6 24/05", "T7 25/05", "CN 26/05"];
const timeSlots = ["17:30", "18:00", "18:30"];

export function ActionButtons({ location, duration, timeRange, group }: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
      <h2 className="text-2xl font-bold text-zinc-900">Thông tin trải nghiệm</h2>

      <div className="space-y-3 text-sm text-zinc-700">
        <p>
          <span className="font-semibold text-zinc-900">Thời lượng:</span> {duration}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Thời gian:</span> {timeRange}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Địa điểm:</span> {location}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Nhóm:</span> {group}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Bao gồm:</span> Ăn tối, nước uống, câu chuyện, hướng dẫn viên
          bản địa.
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Không bao gồm:</span> Chi phí cá nhân khác.
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Ngôn ngữ:</span> Tiếng Việt, English.
        </p>
      </div>

      <div className="space-y-3 border-t border-zinc-100 pt-4">
        <h3 className="text-lg font-semibold text-zinc-900">Lịch khởi hành</h3>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {departureDates.map((date, index) => (
            <button
              key={date}
              type="button"
              className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                index === 1
                  ? "border-orange-400 bg-orange-50 text-orange-700"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 border-t border-zinc-100 pt-4">
        <h3 className="text-lg font-semibold text-zinc-900">Chọn giờ</h3>
        <div className="flex gap-2">
          {timeSlots.map((slot, index) => (
            <button
              key={slot}
              type="button"
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                index === 0
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-3 border-t border-zinc-100 pt-4">
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
    </div>
  );
}
