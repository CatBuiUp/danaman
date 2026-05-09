"use client";

import { useEffect, useState } from "react";

import { storyDetailConnectUrl } from "@/lib/footer-social-links";
import type { GroupSize, StoryExperienceUi } from "@/lib/story-experience-ui";

type ActionButtonsProps = {
  location: string;
  experience: StoryExperienceUi;
};

function formatPriceVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

function groupSizeHeadcountLabel(groupSize: GroupSize): string {
  switch (groupSize) {
    case "Nhóm nhỏ":
      return "1 - 3";
    case "Nhóm vừa":
      return "4 - 8";
    case "Nhóm lớn":
      return "9 - 30";
    default: {
      const _exhaustive: never = groupSize;
      return _exhaustive;
    }
  }
}

export function ActionButtons({ location, experience }: ActionButtonsProps) {
  const {
    durationLabel,
    groupSize,
    pricePerPerson,
    rating,
    reviewCount,
    timeRange,
    departureDates,
    departureSelectedIndex,
    timeSlots,
    timeSlotSelectedIndex,
    includes,
    excludes,
    languages,
  } = experience;

  const [selectedDepartureIndex, setSelectedDepartureIndex] = useState(departureSelectedIndex);
  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(timeSlotSelectedIndex);

  useEffect(() => {
    setSelectedDepartureIndex(departureSelectedIndex);
    setSelectedTimeSlotIndex(timeSlotSelectedIndex);
  }, [departureSelectedIndex, timeSlotSelectedIndex]);

  return (
    <div className="w-full min-w-0 max-w-full space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-1">
      <h2 className="text-2xl font-bold text-zinc-900">Thông tin trải nghiệm</h2>

      <div className="min-w-0 space-y-3 break-words text-sm text-zinc-700">
        <p>
          <span className="font-semibold text-zinc-900">Đánh giá:</span>{" "}
          <span className="text-amber-600">★</span> {rating.toFixed(1)} ({reviewCount})
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Thời lượng:</span> {durationLabel}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Thời gian:</span> {timeRange}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Địa điểm:</span> {location}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Nhóm:</span> {groupSizeHeadcountLabel(groupSize)} người
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Bao gồm:</span> {includes}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Không bao gồm:</span> {excludes}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">Ngôn ngữ:</span> {languages}
        </p>
      </div>

      <div className="space-y-3 border-t border-zinc-100 pt-4">
        <h3 className="text-lg font-semibold text-zinc-900">Lịch khởi hành</h3>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {departureDates.map((date, index) => (
            <button
              key={date}
              type="button"
              aria-pressed={selectedDepartureIndex === index}
              onClick={() => setSelectedDepartureIndex(index)}
              className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${
                selectedDepartureIndex === index
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
        <div className="flex min-w-0 flex-wrap gap-2">
          {timeSlots.map((slot, index) => (
            <button
              key={slot}
              type="button"
              aria-pressed={selectedTimeSlotIndex === index}
              onClick={() => setSelectedTimeSlotIndex(index)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${
                selectedTimeSlotIndex === index
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="min-w-0 shrink sm:pr-2">
          <span className="text-lg font-bold text-orange-600">{formatPriceVnd(pricePerPerson)}</span>
          <span className="text-sm font-normal text-zinc-600"> / người</span>
        </p>
        <a
          href={storyDetailConnectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400 sm:w-auto"
        >
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
}
