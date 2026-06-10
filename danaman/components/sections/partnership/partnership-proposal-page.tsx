import Image from "next/image";
import Link from "next/link";

import { PartnershipProposalForm } from "@/components/sections/partnership/partnership-proposal-form";
import {
  partnershipBenefits,
  partnershipHeroItems,
  partnershipLookingForItems,
  partnershipQuickContacts,
  PARTNERSHIP_PROPOSAL_HERO_IMAGE,
} from "@/lib/partnership-proposal-content";
import { siteContentContainerClass } from "@/lib/site-layout";

function LookingForIcon() {
  return (
    <svg className="h-5 w-5 text-[#5F6557]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BenefitIcon() {
  return (
    <svg className="h-4 w-4 text-[#D0AE7D]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroItemIcon({ icon }: { icon: (typeof partnershipHeroItems)[number]["icon"] }) {
  const className = "h-5 w-5 text-[#5F6557]";

  if (icon === "handshake") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 11V8a2 2 0 0 1 2-2h1M17 11V8a2 2 0 0 0-2-2h-1M7 11l-2 2v3a2 2 0 0 0 2 2h1l3-3M17 11l2 2v3a2 2 0 0 1-2 2h-1l-3-3M10 14l2 2 2-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "lightbulb") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
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

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22c4-3 6-6.5 6-10a6 6 0 1 0-12 0c0 3.5 2 7 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 12v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PartnershipProposalPage() {
  return (
    <div className="bg-[#F7F4EE] pb-12">
      <div className={`${siteContentContainerClass} pt-6`}>
        <nav
          aria-label="Breadcrumb"
          className="font-[family-name:var(--font-inter)] text-sm text-[#5F6557]"
        >
          <Link href="/" className="transition hover:text-[#1F2717]">
            Trang chủ
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#1F2717]">Trở thành đối tác</span>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="space-y-5">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] tracking-[-0.5px] text-[#1F2717] sm:text-5xl">
              Đồng hành cùng Danaman
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-lg font-medium text-[#1F2717] sm:text-xl">
              Bạn có một câu chuyện địa phương đáng được nhiều người biết đến?
            </p>
            <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#5F6557]">
              Danaman đang tìm kiếm những người, những giá trị địa phương để cùng xây dựng trải
              nghiệm chân thật tại Đà Nẵng.
            </p>
            <ul className="grid gap-5 sm:grid-cols-3">
              {partnershipHeroItems.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0EBE2]">
                    <HeroItemIcon icon={item.icon} />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717] sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#5F6557]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-[24px] sm:min-h-[360px]">
            <Image
              src={PARTNERSHIP_PROPOSAL_HERO_IMAGE}
              alt="Người dân địa phương tại làng chài Đà Nẵng"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="space-y-4">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1F2717]">
              Chúng tôi đang tìm kiếm
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {partnershipLookingForItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EBE2]">
                    <LookingForIcon />
                  </div>
                  <h3 className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717]">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-inter)] text-xs leading-relaxed text-[#5F6557]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1F2717]">
              Bạn sẽ nhận được gì?
            </h2>
            <ul className="space-y-3">
              {partnershipBenefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="flex gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0EBE2]">
                    <BenefitIcon />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717]">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-inter)] text-xs leading-relaxed text-[#5F6557]">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <PartnershipProposalForm />
        </div>

        <section className="mt-14 space-y-6">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1F2717] sm:text-3xl">
              Hoặc kết nối với Danaman ngay
            </h2>
            <p className="mx-auto mt-2 max-w-3xl font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#5F6557] sm:text-base">
              Bạn muốn trò chuyện nhanh hơn? Hãy liên hệ trực tiếp với chúng tôi qua các kênh bên dưới nhé!
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {partnershipQuickContacts.map((contact) => (
              <Link
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[24px] border border-black/5 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${contact.iconBg}`}
                >
                  {contact.id === "zalo" ? "Z" : contact.id === "messenger" ? "M" : "W"}
                </span>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717]">
                    {contact.label}
                  </p>                  
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
