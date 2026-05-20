import Link from "next/link";

import { joinDanamanHref } from "@/lib/site-nav";

const HERO_GRADIENT =
  "linear-gradient(90deg, rgba(13,17,7,0.92) 0%, rgba(13,17,7,0.75) 35%, rgba(13,17,7,0.25) 70%, rgba(13,17,7,0.08) 100%)";

const HERO_IMAGE = "/hero/hero_background.png";

export function HeroSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-[#1F2717]">
      <div
        className="relative flex min-h-[100dvh] flex-col justify-center md:min-h-[800px]"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: HERO_GRADIENT }} />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-28 pb-16 sm:px-10 sm:pt-32 lg:px-16 lg:pb-20">
          <div className="max-w-2xl space-y-6 lg:max-w-3xl lg:space-y-8">
            <p className="font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.32em] text-[#D0AE7D] sm:text-sm">
              DANAMAN
            </p>

            <h1 className="space-y-1 font-[family-name:var(--font-playfair)] text-[#EEDBC0]">
              <span className="block text-[2rem] leading-[1.15] font-normal tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                Trải nghiệm Đà Nẵng
              </span>
              <span className="block text-[2rem] leading-[1.15] font-normal tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                theo cách của
              </span>
              <span className="block font-[family-name:var(--font-allura)] text-[2.75rem] leading-none text-[#AAB38A] sm:text-6xl lg:text-[4.5rem]">
                người bản địa
              </span>
            </h1>

            <p className="max-w-xl font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#D7C9B2] sm:text-base">
              Câu chuyện thật — Trải nghiệm thật — Kết nối thật
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#experiences"
                className="inline-flex items-center justify-center rounded-2xl bg-[#D0AE7D] px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#1F2717] transition hover:bg-[#e0c090]"
              >
                Khám phá trải nghiệm
              </Link>
              <Link
                href={joinDanamanHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-[#D0AE7D] px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#EEDBC0] transition hover:bg-[#D0AE7D]/10"
              >
                Tham gia Danaman
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
