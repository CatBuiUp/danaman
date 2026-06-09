import Image from "next/image";
import Link from "next/link";

import { HOME_PARTNERSHIP_IMAGE } from "@/lib/home-featured-experience";

function IconLightbulb() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18h6M10 22h4M8.5 14a5.5 5.5 0 1 1 7.8-7.8A5.5 5.5 0 0 1 8.5 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FeaturedPartnershipCard() {
  return (
    <article className="overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col sm:flex-row">
        <div className="relative min-h-[220px] w-full shrink-0 sm:min-h-[280px] sm:w-[42%]">
          <Image
            src={HOME_PARTNERSHIP_IMAGE}
            alt="Cảnh biển Đà Nẵng"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 42vw"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-5 p-5 sm:p-6">
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.15] tracking-[-0.5px] text-[#1F2717] sm:text-[1.65rem]">
              Những trải nghiệm mới đang được phát triển
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-base leading-[1.65] text-[#5F6557] sm:text-lg">
              Danaman đang tìm kiếm và phát triển những trải nghiệm địa phương mới tại Đà Nẵng.
            </p>
          </div>

          <Link
            href="/de-xuat-y-tuong"
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-[#D0AE7D] px-5 py-2.5 font-[family-name:var(--font-inter)] text-base font-semibold text-[#1F2717] transition hover:bg-[#e0c090]"
          >
            <IconLightbulb />
            Đề xuất ý tưởng
          </Link>
        </div>
      </div>
    </article>
  );
}
