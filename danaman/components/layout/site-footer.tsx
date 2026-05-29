import Link from "next/link";

import { FooterLinkGroup } from "@/components/layout/footer-link-group";
import { CommunityTestimonialsSection } from "@/components/sections/community-testimonials-section";
import {
  footerDanamanLinks,
  footerExploreLinks,
  footerPhuOngLinks,
} from "@/lib/footer-nav";
import { siteContentContainerClass } from "@/lib/site-layout";
import { joinDanamanHref } from "@/lib/site-nav";

const FOOTER_QUOTE =
  "Đến Đà Nẵng không chỉ để ngắm nhìn, mà để sống cùng nhịp thở của người bản địa. Mỗi con người là một câu chuyện, mỗi nụ cười là một bản sắc.";

function FooterBoatIllustration() {
  return (
    <svg
      className="h-auto w-[88px] shrink-0 text-[#D0AE7D] sm:w-[100px]"
      viewBox="0 0 100 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 58 Q50 68 92 58"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M22 58 L38 28 L62 28 L78 58 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M50 28 L50 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M30 22 Q50 8 70 22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M18 14 Q22 10 26 14 M34 10 Q38 6 42 10 M58 12 Q62 8 66 12"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <>
      <CommunityTestimonialsSection />
      <footer className="w-full shrink-0 bg-[#1F2717] text-[#D7C9B2]">
      <div className={`${siteContentContainerClass} py-14 lg:py-16`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          <div className="flex gap-5 lg:col-span-4 lg:gap-6">
            <blockquote className="font-[family-name:var(--font-allura)] text-xl leading-[1.45] text-[#D0AE7D] sm:text-2xl">
              {FOOTER_QUOTE}
            </blockquote>
            <FooterBoatIllustration />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <FooterLinkGroup title="Khám phá" links={footerExploreLinks} />
            <div id="ve-danaman">
              <FooterLinkGroup title="Danaman" links={footerDanamanLinks} />
            </div>
            <FooterLinkGroup title="Phú Ông Foods" links={footerPhuOngLinks} />
          </div>

          <div id="lien-he" className="lg:col-span-3">
            <p className="font-[family-name:var(--font-montserrat)] text-[11px] font-light uppercase tracking-[0.22em] text-[#D0AE7D]">
              Nhận những câu chuyện mới từ Đà Nẵng
            </p>
            <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-[#D7C9B2]">
              Đăng ký để nhận thông tin về ưu đãi, câu chuyện và trải nghiệm thú vị từ Danaman.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <input
                type="email"
                name="email"
                placeholder="Email của bạn..."
                className="min-w-0 flex-1 rounded-lg border border-[#D0AE7D]/25 bg-[#25301C] px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-[#EEDBC0] placeholder:text-[#5F6557] focus:border-[#D0AE7D]/60 focus:outline-none"
              />
              <Link
                href={joinDanamanHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-[#D0AE7D] px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717] transition hover:bg-[#e0c090]"
              >
                Theo dõi
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#D0AE7D]/20 pt-6 font-[family-name:var(--font-inter)] text-xs text-[#5F6557] sm:flex-row sm:gap-6">
          <p>© 2024 Danaman. All rights reserved.</p>
          <p className="text-center">
            <Link href="#" className="transition hover:text-[#D7C9B2]">
              Chính sách bảo mật
            </Link>
            <span className="mx-2">|</span>
            <Link href="#" className="transition hover:text-[#D7C9B2]">
              Điều khoản sử dụng
            </Link>
          </p>
          <p>Made with ❤️ in Da Nang</p>
        </div>
      </div>
    </footer>
    </>
  );
}
