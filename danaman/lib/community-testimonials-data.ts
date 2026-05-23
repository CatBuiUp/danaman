export type CommunityTestimonial = {
  id: string;
  name: string;
  avatarUrl: string;
  quote: string;
  rating: number;
};

export type CommunityFeature = {
  id: string;
  title: string;
  description: string;
};

export const communityIntro = {
  label: "Cộng đồng Danaman",
  headline: "Ở đây, mỗi người là một phần của câu chuyện Đà Nẵng",
} as const;

export const communityTestimonials: CommunityTestimonial[] = [
  {
    id: "minh-anh",
    name: "Minh Anh",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    quote:
      "Tôi đã từng chỉ biết Đà Nẵng qua những gương mặt, những hình ảnh trên mạng. Cho đến khi cùng Danaman, tôi mới thật sự cảm nhận được nhịp sống và sự ấm áp của người dân nơi đây.",
    rating: 5,
  },
  {
    id: "quoc-bao",
    name: "Quốc Bảo",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    quote:
      "Tôi lấy đường phố Đà Nẵng làm sân khấu, còn người dân là khán giả chân thật nhất. Danaman giúp tôi kết nối với cộng đồng sáng tạo và chia sẻ câu chuyện một cách tự nhiên.",
    rating: 5,
  },
  {
    id: "huong-giang",
    name: "Hương Giang",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    quote:
      "Nhờ Danaman, tôi được gặp những người bạn cùng yêu văn hoá Đà Nẵng. Mỗi buổi gặp gỡ đều mang lại cảm hứng và kỷ niệm đáng nhớ.",
    rating: 5,
  },
  {
    id: "lan-phuong",
    name: "Lan Phương",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    quote:
      "Là Việt kiều về thăm quê, tôi tìm thấy ở Danaman những trải nghiệm chân thực — không chỉ điểm đến mà còn là con người và câu chuyện phía sau.",
    rating: 5,
  },
  {
    id: "duc-huy",
    name: "Đức Huy",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    quote:
      "Tôi thích cách Danaman tôn vinh người bản địa. Mỗi tour, mỗi workshop đều có cảm giác gần gũi như được bạn bè địa phương dẫn đi.",
    rating: 5,
  },
  {
    id: "thao-nguyen",
    name: "Thảo Nguyên",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    quote:
      "Đăng ký nhận tin và tham gia sự kiện qua Danaman rất tiện. Tôi luôn cập nhật được ưu đãi và câu chuyện mới từ Đà Nẵng mỗi tuần.",
    rating: 5,
  },
];

export const communityFeatures: CommunityFeature[] = [
  {
    id: "authentic",
    title: "Trải nghiệm thật",
    description: "Từ người bản địa",
  },
  {
    id: "community",
    title: "Cộng đồng",
    description: "Việt kiều & du khách",
  },
  {
    id: "trust",
    title: "Tin tức & ưu đãi",
    description: "An tâm",
  },
  {
    id: "support",
    title: "Hỗ trợ nhanh",
    description: "24/7",
  },
];

/** Số card bình luận hiển thị cùng lúc (desktop). */
export const DESKTOP_VISIBLE_TESTIMONIALS = 4;

/** Bước cuộn trên desktop — lộ thêm 2 card còn lại. */
export const DESKTOP_SCROLL_STEP = 2;
