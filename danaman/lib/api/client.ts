import type { ApiResponse, Experience, Opportunity, Story } from "@/types";

const FALLBACK_STORIES: Story[] = [
  {
    id: "story-01",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    title: "Câu chuyện của một thư viện nhỏ trở thành một trung tâm sáng tạo thanh niên",
    description: "Một đội cộng đồng đã biến một phòng đọc không sử dụng thành một trung tâm câu chuyện cho thanh niên.",
    author: "Nguyễn Văn A",
    location: "Đà Nẵng",
    readTime: "6 phút đọc",
    category: "Cộng đồng",
  },
  {
    id: "story-02",
    image:
      "https://images.unsplash.com/photo-1469571486292-b53601010376?auto=format&fit=crop&w=1200&q=80",
    title: "Nông dân ghi chép sự thay đổi khí hậu với diaries di động",
    description: "Một cộng đồng hiện nay theo dõi sự thay đổi theo mùa thông qua các câu chuyện và bản ghi hình ảnh.",
    author: "Nguyễn Văn A",
    location: "Đà Nẵng",
    readTime: "4 phút đọc",
    category: "Môi trường",
  },
  {
    id: "story-03",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    title: "Không gian sáng tạo được lãnh đạo bởi phụ nữ",
    description: "Không gian sáng tạo được lãnh đạo bởi phụ nữ được tạo ra để kết nối văn hóa truyền thống với thiết kế sản phẩm hiện đại và bán online.",
    author: "Nguyễn Thị Thu",
    location: "Đà Nẵng",
    readTime: "5 min read",
    category: "Văn hóa",
  },
];

const FALLBACK_EXPERIENCES: Experience[] = [
  {
    id: "exp-01",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    title: "Sự kiện trực tuyến",
    description: "Một sự kiện trực tuyến được tổ chức để học hỏi và hợp tác.",
    duration: "2 ngày",
    mode: "Online",
  },
  {
    id: "exp-02",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    title: "Sự kiện trực tiếp",
    description: "Một sự kiện trực tiếp được tổ chức để học hỏi và hợp tác.",
    duration: "3 ngày",
    mode: "Offline",
  },
  {
    id: "exp-03",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    title: "Sự kiện hỗn hợp",
    description: "Một sự kiện hỗn hợp được tổ chức để học hỏi và hợp tác.",
    duration: "4 ngày",
    mode: "Hybrid",
  },
];

const FALLBACK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-01",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    title: "Thực tập sinh",
    description: "Một sự kiện trực tuyến được tổ chức để học hỏi và hợp tác.",
    type: "Volunteer",
    deadline: "30/5/2026",
  },
  {
    id: "opp-02",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    title: "Học bổng",
    description: "Một sự kiện trực tuyến được tổ chức để học hỏi và hợp tác.",
    type: "Fellowship",
    deadline: "30/5/2026",
  },
  {
    id: "opp-03",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    title: "Hỗ trợ tài chính",
    description: "Một sự kiện trực tuyến được tổ chức để học hỏi và hợp tác.",
    type: "Funding",
    deadline: "12/6/2026",
  },
];

export async function getFeaturedStories(): Promise<ApiResponse<Story[]>> {
  return Promise.resolve({
    data: FALLBACK_STORIES,
    message: "Sử dụng các câu chuyện mẫu",
  });
}

export async function getExperiences(): Promise<ApiResponse<Experience[]>> {
  return Promise.resolve({
    data: FALLBACK_EXPERIENCES,
    message: "Sử dụng các trải nghiệm mẫu",
  });
}

export async function getOpportunities(): Promise<ApiResponse<Opportunity[]>> {
  return Promise.resolve({
    data: FALLBACK_OPPORTUNITIES,
    message: "Sử dụng các cơ hội mẫu",
  });
}
