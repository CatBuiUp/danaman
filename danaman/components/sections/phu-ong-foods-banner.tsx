import Image from "next/image";
import Link from "next/link";

import { storyDetailConnectUrl } from "@/lib/footer-social-links";
import { siteContentContainerClass } from "@/lib/site-layout";

const BANNER_IMAGE = "/bannerPhuOngFoods.png";

export function PhuOngFoodsBanner() {
  return (
    <section className="bg-[#F7F4EE] pb-10">
      <div className={siteContentContainerClass}>
        <div className="relative min-h-[220px] overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:min-h-[280px] lg:min-h-[320px]">
          <Image
            src={BANNER_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2717]/92 via-[#1F2717]/72 to-[#1F2717]/15" />

          <div className="relative z-10 flex min-h-[220px] items-center p-8 sm:min-h-[280px] md:p-10 lg:min-h-[320px] lg:p-12">
            <div className="max-w-md space-y-5 sm:max-w-lg">
              <p className="font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.28em] text-[#D0AE7D]">
                Phú Ông Foods
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium leading-[1.2] tracking-[-0.5px] text-[#EEDBC0] sm:text-4xl">
                Mang hương vị Đà Nẵng về nhà
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-[#D7C9B2] sm:text-base">
                Đặc sản chuẩn vị từ Phú Ông Foods
              </p>
              <Link
                href={storyDetailConnectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#D0AE7D] px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717] transition hover:bg-[#e0c090]"
              >
                Khám phá Phú Ông Foods →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
