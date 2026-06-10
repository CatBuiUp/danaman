import { CHU_MUOI_LANDING_GALLERY } from "@/lib/landing-images";

export type ExperienceLandingHighlight = {
  icon: "artisan" | "place" | "meal" | "photo";
  label: string;
};

export type ExperienceLandingItineraryStep = {
  step: number;
  title: string;
  description: string;
  image?: string;
};

export type ExperienceLandingQuickInfo = {
  icon: "location" | "time" | "guests" | "language" | "booking";
  label: string;
  value: string;
};

export type ExperienceLandingMetaItem = {
  icon: "heritage" | "location" | "time";
  text: string;
};

export type ExperienceLandingContent = {
  headline: string;
  subtitle: string;
  metaItems: ExperienceLandingMetaItem[];
  priceFrom: number;
  priceNote: string;
  videoDuration: string;
  highlights: ExperienceLandingHighlight[];
  itinerary: ExperienceLandingItineraryStep[];
  quickInfo: ExperienceLandingQuickInfo[];
  testimonial: {
    quote: string;
    author: string;
    location: string;
    rating: number;
    avatar?: string;
  };
  contactPhone: string;
  supportNote: string;
  galleryImages: readonly string[];
};

export const experienceLandingContentByStoryId: Record<string, ExperienceLandingContent> = {
  "mock-story-1": {
    headline: "GIỮ MÙI BIỂN",
    subtitle: "Trải nghiệm nghề làm mắm truyền thống cùng chú Mười",
    metaItems: [
      { icon: "heritage", text: "13 đời giữ nghề" },
      { icon: "location", text: "Sơn Trà, Đà Nẵng" },
      { icon: "time", text: "60 – 90 phút" },
    ],
    priceFrom: 199_000,
    priceNote: "Giá linh hoạt theo lựa chọn trải nghiệm",
    videoDuration: "00:28",
    highlights: [
      { icon: "artisan", label: "Nghệ nhân thật" },
      { icon: "place", label: "Địa điểm thật" },
      { icon: "meal", label: "Bữa cơm địa phương" },
      { icon: "photo", label: "Ảnh lưu niệm đẹp" },
    ],
    itinerary: [
      {
        step: 1,
        title: "Gặp Người Giữ Hồn Biển",
        description: "Làm quen và lắng nghe câu chuyện đời của Chú Mười.",
        image: "/landing/chu-muoi-ngoi.png",
      },
      {
        step: 2,
        title: "Dạo Bước Làng Biển Tân Thái",
        description: "Khám phá những con hẻm và ký ức làng chài Đà Nẵng.",
        image: "/landing/dao-buoc-lang-bien-tan-thai.jpg",
      },
      {
        step: 3,
        title: "Tham Quan Lăng Ngư Ông",
        description: "Tìm hiểu văn hóa tín ngưỡng đặc trưng của ngư dân miền biển.",
        image: "/landing/tham-quan-lang-ngu-ong.jpg",
      },
      {
        step: 4,
        title: "Khám Phá Nghề Biển Xưa",
        description: "Chiêm ngưỡng những ngư cụ và câu chuyện mưu sinh trên biển.",
        image: "/landing/dong-hanh-cung-danaman.png",
      },
      {
        step: 5,
        title: "Trải Nghiệm Làm Mắm Truyền Thống",
        description: "Tìm hiểu bí quyết tạo nên những giọt nước mắm nhỉ.",
        image: "/landing/trai-nghiem/4.png",
      },
      {
        step: 6,
        title: "Thưởng Thức Bữa Cơm Người Biển",
        description: "Ăn cùng người địa phương, nghe những câu chuyện đời thường.",
        image: "/landing/trai-nghiem/3.jpg",
      },
      {
        step: 7,
        title: "Mang Một Chút Mùi Biển Về Nhà",
        description: "Lưu giữ kỷ niệm và lựa chọn những sản vật địa phương.",
        image: "/landing/trai-nghiem/2.png",
      },
    ],
    quickInfo: [
      { icon: "location", label: "Địa điểm", value: "Mân Thái, Sơn Trà, Đà Nẵng" },
      { icon: "time", label: "Thời gian", value: "60 – 120 phút" },
      { icon: "guests", label: "Số lượng khách", value: "Tối thiểu 4 người · Tối đa 12 người / buổi" },
      { icon: "language", label: "Ngôn ngữ", value: "Tiếng Việt" },
      { icon: "booking", label: "Đặt trước", value: "Trước ít nhất 24 giờ" },
    ],
    testimonial: {
      quote:
        "Một trải nghiệm tuyệt vời! Được chú Mười kể chuyện và tự tay làm mắm giúp mình hiểu thêm về văn hóa Đà Nẵng.",
      author: "Minh Anh",
      location: "Hà Nội",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    contactPhone: "0356 325 576",
    supportNote: "Hỗ trợ nhanh 24/7",
    galleryImages: CHU_MUOI_LANDING_GALLERY,
  },
};

export function getExperienceLandingContent(storyId: string): ExperienceLandingContent | null {
  return experienceLandingContentByStoryId[storyId] ?? null;
}
