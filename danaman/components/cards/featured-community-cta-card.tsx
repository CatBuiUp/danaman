import Image from "next/image";
import Link from "next/link";

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
] as const;

const DEFAULT_DESCRIPTION_LINES = [
  "Kể câu chuyện của bạn",
  "kết nối – chia sẻ – cơ hội ",
  "cùng nhau phát triển",
] as const;

type FeaturedCommunityCtaCardProps = {
  title?: string;
  descriptionLines?: readonly string[];
  ctaLabel?: string;
  ctaHref?: string;
  memberCountLabel?: string;
  memberSubtitle?: string;
  avatarUrls?: readonly string[];
};

export function FeaturedCommunityCtaCard({
  title = "Bạn cũng có câu chuyện tại Đà Nẵng?",
  descriptionLines = DEFAULT_DESCRIPTION_LINES,
  ctaLabel = "Tham gia Danaman ngay",
  ctaHref = "#opportunities",
  memberCountLabel = "+2.500",
  memberSubtitle = "thành viên",
  avatarUrls = DEFAULT_AVATARS,
}: FeaturedCommunityCtaCardProps) {
  const ring = "border-2 border-[#f5f0e8] dark:border-zinc-900";

  return (
    <article className="flex h-[320px] flex-col justify-between rounded-2xl border border-black/10 bg-[#f5f0e8] p-6 shadow-md dark:border-white/10 dark:bg-zinc-900/80">
      <div className="space-y-4">
        <h3 className="text-xl font-bold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-300">
          {descriptionLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </p>
        <Link
          href={ctaHref}
          className="inline-flex w-fit rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          {ctaLabel}
        </Link>
      </div>

      <div
        className="flex items-center gap-3 pt-2"
        aria-label={`${memberCountLabel} ${memberSubtitle} đã tham gia cộng đồng`}
      >
        <div className="flex min-w-0 flex-1 items-center">
          {avatarUrls.slice(0, 4).map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full ${ring} ${index > 0 ? "-ml-2" : ""}`}
              style={{ zIndex: 4 - index }}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="36px" />
            </div>
          ))}
          <div
            className={`relative z-[5] -ml-2 flex h-9 min-w-[2.5rem] shrink-0 items-center justify-center rounded-full bg-zinc-500 px-1.5 ${ring}`}
          >
            <span className="text-[10px] font-bold leading-none text-white">{memberCountLabel}</span>
          </div>
        </div>
        <div className="shrink-0 text-xs leading-tight text-zinc-800 dark:text-zinc-200">
          <p className="font-semibold">
            {memberCountLabel} viên
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">{memberSubtitle}</p>
        </div>
      </div>
    </article>
  );
}
