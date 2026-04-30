"use client";

import { StoryCard } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import { useStories } from "@/lib/hooks/use-stories";
import type { Story } from "@/types";

const MOCK_STORIES: Story[] = [
  {
    id: "mock-story-1",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    title: "Nguoi tre bien bai giu gin bo bien Da Nang",
    description: "Nhóm thanh niên tổ chức đơn rác và lặn tặng nhận thực bảo vệ môi trường biển.",
    author: "Minh Anh",
    location: "Đà Nẵng",
    readTime: "5 phút đọc",
    category: "Cộng đồng",
  },
  {
    id: "mock-story-2",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    title: "Hành trình một lớp học cho trẻ em vùng ven",
    description: "Từ một ý tưởng nhỏ, lớp học cuối tuần đã trở thành điểm đến của nhiều em nhỏ.",
    author: "Gia Han",
    location: "Liên Chiểu",
    readTime: "4 phút đọc",
    category: "Giáo dục",
  },
  {
    id: "mock-story-3",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    title: "Quản cáp học sách kết nối người trẻ và nghe nhạc",
    description: "Không gian nhỏ giúp giới thiệu nghe thủ công truyền thống đến người trẻ thành phố.",
    author: "Bao Tran",
    location: "Hải Châu",
    readTime: "6 phút đọc",
    category: "Văn hóa",
  },
  {
    id: "mock-story-4",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    title: "Nhóm startup xã hội đưa nông sản lên nền tảng số",
    description: "Câu chuyện về cách các bạn trẻ hỗ trợ người dân bán hàng qua kênh trực tuyến.",
    author: "Thanh Khoa",
    location: "Sơn Trà",
    readTime: "7 phút đọc",
    category: "Khởi nghiệp",
  },
  {
    id: "mock-story-5",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    title: "Đềm nhạc đường phố gay quyên cho thư viện cộng đồng",
    description: "Sự kiện quyên góp nhiều nghệ sĩ trẻ, thu hút hàng trăm bạn trẻ tham gia.",
    author: "Ngoc Bich",
    location: "Ngũ Hành Sơn",
    readTime: "3 phút đọc",
    category: "Sự kiện",
  },
  {
    id: "mock-story-6",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    title: "Tiệm bánh nho trao cơ hội làm việc cho người khuyết tật",
    description: "Mô hình kinh doanh bên vùng giúp nhiều lao động yếu thế có thu nhập ổn định.",
    author: "Quoc Huy",
    location: "Cẩm Lệ",
    readTime: "5 phút đọc",
    category: "Tác động xã hội",
  },
  {
    id: "mock-story-7",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    title: "Khán phá làng nghề truyền thống cùng huớng dẫn viên bản địa",
    description: "Chuỗi workshop giúp du khách hiểu hơn về lịch sử và bán sản phẩm địa phương.",
    author: "Tuan Vu",
    location: "Hoa Vang",
    readTime: "4 phút đọc",
    category: "Du lịch",
  },
  {
    id: "mock-story-8",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    title: "Cô giáo hỗ trợ lớp học miễn phí cho công nhân",
    description: "Mọi tôi, lớp học nhỏ sáng đến, giúp công nhân bổ sung kỹ năng và tự tin hơn.",
    author: "Lan Chi",
    location: "Thanh Khê",
    readTime: "6 phút đọc",
    category: "Cảm hứng",
  },
];

function StoryCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <div className="h-44 w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </article>
  );
}

export function FeaturedStoriesClientSection() {
  const { stories, isLoading, error, reload } = useStories();
  const storiesToRender = stories.length > 0 ? stories : MOCK_STORIES;

  return (
    <section id="stories" className="space-y-6">
      <SectionHeading
        eyebrow=""
        title="Câu chuyện mới nhất"
        description=""
      />

      {error && stories.length > 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm dark:border-red-900 dark:bg-red-950/30">
          <p className="font-medium text-red-700 dark:text-red-300">
            Could not load stories right now.
          </p>
          <p className="mt-1 text-red-600/90 dark:text-red-300/90">{error}</p>
          <button
            type="button"
            onClick={() => void reload()}
            className="mt-4 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
          >
            Try again
          </button>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <StoryCardSkeleton key={index} />)
          : storiesToRender.slice(0, 8).map((story) => <StoryCard key={story.id} story={story} />)}
      </div>
    </section>
  );
}
