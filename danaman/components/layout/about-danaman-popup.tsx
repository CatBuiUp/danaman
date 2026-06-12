"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import { aboutDanamanParagraphs } from "@/lib/about-danaman-content";

type AboutDanamanPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AboutDanamanPopup({ isOpen, onClose }: AboutDanamanPopupProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#D0AE7D]/25 bg-[#1F2717] shadow-[0_24px_80px_rgba(0,0,0,0.55)] max-h-[calc(100vh-2rem)] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-danaman-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl leading-none text-white transition hover:bg-black/70"
          aria-label="Đóng popup Về Danaman"
        >
          ×
        </button>

        <div className="p-8 pt-12 sm:p-10 sm:pt-14">
          
          <div className="space-y-5">
            {aboutDanamanParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-[family-name:var(--font-allura)] text-xl leading-[1.45] text-[#D0AE7D] sm:text-2xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
