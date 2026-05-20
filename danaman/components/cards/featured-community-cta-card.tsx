import Image from "next/image";
import Link from "next/link";

import { joinDanamanHref } from "@/lib/site-nav";

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
] as const;

const DEFAULT_TITLE_LINE1 = "Bạn cũng có";
const DEFAULT_TITLE_LINE2 = "câu chuyện tại Đà Nẵng?";

const DEFAULT_DESCRIPTION_LINES = [
  "Kể câu chuyện của bạn,",
  "kết nối – chia sẻ – cơ hội",
  "cùng nhau phát triển.",
] as const;

type FeaturedCommunityCtaCardProps = {
  titleLine1?: string;
  titleLine2?: string;
  descriptionLines?: readonly string[];
  ctaLabel?: string;
  ctaHref?: string;
  memberCountBadge?: string;
  memberCountLine1?: string;
  memberCountLine2?: string;
  avatarUrls?: readonly string[];
};

export function FeaturedCommunityCtaCard({
  titleLine1 = DEFAULT_TITLE_LINE1,
  titleLine2 = DEFAULT_TITLE_LINE2,
  descriptionLines = DEFAULT_DESCRIPTION_LINES,
  ctaLabel = "Tham gia Danaman ngay",
  ctaHref = joinDanamanHref,
  memberCountBadge = "+2.500",
  memberCountLine1 = "+2.500 viên",
  memberCountLine2 = "thành viên",
  avatarUrls = DEFAULT_AVATARS,
}: FeaturedCommunityCtaCardProps) {
  const ring = "border-2 border-[#F7F4EE]";

  return (
    <article className="flex min-h-[260px] flex-col justify-between rounded-[24px] bg-[#F0EBE2] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:min-h-[300px] lg:min-h-[320px]">
      <div className="space-y-4">
        <div className="space-y-0.5">
          <p className="font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-[#1F2717]">
            {titleLine1}
          </p>
          <h3 className="font-[family-name:var(--font-playfair)] text-[1.15rem] font-medium leading-[1.15] tracking-[-0.5px] text-[#1F2717] sm:text-[1.25rem]">
            {titleLine2}
          </h3>
        </div>

        <p className="font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-[#1F2717]">
          {descriptionLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </p>

        <Link
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit rounded-2xl bg-[#D0AE7D] px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717] transition hover:bg-[#e0c090]"
        >
          {ctaLabel}
        </Link>
      </div>

      <div
        className="flex items-center gap-3 pt-6"
        aria-label={`${memberCountLine1} ${memberCountLine2}`}
      >
        <div className="flex items-center">
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
            className={`relative z-[5] -ml-2 flex h-9 min-w-[2.5rem] shrink-0 items-center justify-center rounded-full bg-[#8A8F84] px-1.5 ${ring}`}
          >
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold leading-none text-white">
              {memberCountBadge}
            </span>
          </div>
        </div>
        <div className="font-[family-name:var(--font-inter)] text-xs leading-tight text-[#1F2717]">
          <p className="font-semibold">{memberCountLine1}</p>
          <p className="text-[#5F6557]">{memberCountLine2}</p>
        </div>
      </div>
    </article>
  );
}
