"use client";

import Link from "next/link";

import { useContactPopup } from "@/components/layout/contact-popup-provider";
import type { FooterLink } from "@/lib/footer-nav";

const linkClassName =
  "font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-[#D7C9B2] transition hover:text-[#EEDBC0]";

type FooterLinkGroupProps = {
  title: string;
  links: FooterLink[];
};

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  const { openContactPopup } = useContactPopup();

  return (
    <div>
      <p className="font-[family-name:var(--font-montserrat)] text-[11px] font-light uppercase tracking-[0.22em] text-[#D0AE7D]">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map(({ label, href, external, opensContactPopup }) => (
          <li key={label}>
            {opensContactPopup ? (
              <button type="button" onClick={openContactPopup} className={`${linkClassName} text-left`}>
                {label}
              </button>
            ) : (
              <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={linkClassName}
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
