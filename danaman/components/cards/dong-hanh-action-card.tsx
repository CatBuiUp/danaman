import Link from "next/link";
import type { ReactNode } from "react";

type DongHanhActionCardProps = {
  icon: ReactNode;
  iconClassName: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  ctaExternal?: boolean;
  onCtaClick?: () => void;
};

export function DongHanhActionCard({
  icon,
  iconClassName,
  title,
  description,
  ctaLabel,
  ctaHref,
  ctaExternal,
  onCtaClick,
}: DongHanhActionCardProps) {
  const ctaClassName =
    "mt-auto inline-flex w-fit font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1F2717] transition hover:text-[#5F6557]";

  return (
    <article className="flex min-h-[220px] flex-col rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${iconClassName}`}>
        {icon}
      </div>

      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold leading-[1.2] tracking-[-0.5px] text-[#1F2717]">
        {title}
      </h3>

      <p className="mt-2 flex-1 font-[family-name:var(--font-inter)] text-sm leading-[1.65] text-[#5F6557]">
        {description}
      </p>

      {onCtaClick ? (
        <button type="button" onClick={onCtaClick} className={ctaClassName}>
          {ctaLabel}
        </button>
      ) : (
        <Link
          href={ctaHref ?? "#"}
          target={ctaExternal ? "_blank" : undefined}
          rel={ctaExternal ? "noopener noreferrer" : undefined}
          className={ctaClassName}
        >
          {ctaLabel}
        </Link>
      )}
    </article>
  );
}

function IconHandshake() {
  return (
    <svg className="h-5 w-5 text-[#1F2717]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 12l2 2 5-5M7 8.5 5.5 7 4 8.5 5.5 10M17 8.5 18.5 7 20 8.5 18.5 10M12 18l-1.5 2.5M8 14.5 6.5 16M16 14.5l1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLightbulb() {
  return (
    <svg className="h-5 w-5 text-[#1F2717]" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function IconChat() {
  return (
    <svg className="h-5 w-5 text-[#1F2717]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 9h10M7 13h6M6 18l2.5-2H18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const dongHanhActionIcons = {
  handshake: <IconHandshake />,
  lightbulb: <IconLightbulb />,
  chat: <IconChat />,
} as const;
