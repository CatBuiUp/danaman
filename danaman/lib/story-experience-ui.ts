import type { Story } from "@/types";

export type GroupSize = "Nhóm nhỏ" | "Nhóm vừa" | "Nhóm lớn";

export type StoryExperienceUi = {
  durationLabel: string;
  groupSize: GroupSize;
  pricePerPerson: number;
  rating: number;
  reviewCount: number;
  timeRange: string;
  departureDates: string[];
  departureSelectedIndex: number;
  timeSlots: string[];
  timeSlotSelectedIndex: number;
  includes: string;
  excludes: string;
  languages: string;
};

const GROUP_SIZES: GroupSize[] = ["Nhóm nhỏ", "Nhóm vừa", "Nhóm lớn"];

const TIME_RANGES = [
  "11:00 - 20:00",
  "08:00 - 18:00",
  "14:00 - 21:30",
  "09:00 - 17:00",
];

const DEPARTURE_DATES = ["T2 20/05", "T3 21/05", "T4 22/05", "T5 23/05", "T6 24/05", "T7 25/05", "CN 26/05"];

const TIME_SLOTS = ["17:30", "18:00", "18:30"];

const INCLUDES_OPTIONS = [
  "Ăn tối, nước uống, câu chuyện, hướng dẫn viên bản địa.",
  "Đón tại điểm hẹn, hoạt động cộng đồng, tài liệu tham khảo, quà lưu niệm nhỏ.",
  "Trải nghiệm giao lưu, chụp ảnh, snack nhẹ, kết nối với người địa phương.",
  "Tham quan có hướng dẫn, bảo hiểm nhóm, nước uống trong buổi.",
];

const EXCLUDES_OPTIONS = [
  "Chi phí cá nhân khác.",
  "Di chuyển cá nhân ngoài giờ hẹn; chi phí phát sinh không trong chương trình.",
  "Đồ uống có cồn ngoài gói; chi tiêu cá nhân.",
  "Phụ phí dịch vụ thêm không đăng ký trước.",
];

const LANGUAGE_OPTIONS = [
  "Tiếng Việt, English.",
  "Tiếng Việt.",
  "Tiếng Việt, English (hướng dẫn hỗ trợ).",
];

function durationLabelFromStory(story: Story): string {
  const raw = story.readTime?.trim();
  if (!raw) return "3 - 4 tiếng";
  if (raw.includes("phút đọc")) return raw.replace("phút đọc", "tiếng");
  const minMatch = raw.match(/(\d+)\s*min\s*read/i);
  if (minMatch) return `${minMatch[1]} phút đọc`;
  return raw;
}

/**
 * Cùng quy tắc với `FeaturedStoriesClientSection` (7 story đầu trên trang chủ + card CTA; index card 0..6).
 * Story trong DB: dùng vị trí trong danh sách API (module 8) để khớp biến thể hiển thị khi có đủ data.
 */
export function resolveFeaturedListIndex(id: string, apiStories: { id: string }[]): number {
  const fullIndex = apiStories.findIndex((s) => s.id === id);
  if (fullIndex >= 0) return fullIndex % 8;

  const mock = /^mock-story-(\d+)$/i.exec(id);
  if (mock) {
    const n = Number.parseInt(mock[1], 10);
    if (Number.isFinite(n) && n >= 1) return Math.min(n - 1, 7);
  }

  return 0;
}

export function mapStoryToFeaturedExperience(story: Story, index: number): StoryExperienceUi {
  const durationLabel = durationLabelFromStory(story) || "3 - 4 tiếng";
  const groupSize = GROUP_SIZES[index % GROUP_SIZES.length];
  const pricePerPerson = 350000 + index * 35000;
  const rating = 4.6 + (index % 4) * 0.1;
  const reviewCount = 60 + index * 12;
  const timeRange = TIME_RANGES[index % TIME_RANGES.length];

  return {
    durationLabel,
    groupSize,
    pricePerPerson,
    rating,
    reviewCount,
    timeRange,
    departureDates: DEPARTURE_DATES,
    departureSelectedIndex: index % DEPARTURE_DATES.length,
    timeSlots: TIME_SLOTS,
    timeSlotSelectedIndex: index % TIME_SLOTS.length,
    includes: INCLUDES_OPTIONS[index % INCLUDES_OPTIONS.length],
    excludes: EXCLUDES_OPTIONS[index % EXCLUDES_OPTIONS.length],
    languages: LANGUAGE_OPTIONS[index % LANGUAGE_OPTIONS.length],
  };
}
