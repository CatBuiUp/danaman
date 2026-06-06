"use client";

import Image from "next/image";
import { useState } from "react";

const GALLERY_COLUMNS = 2;
const GALLERY_INITIAL_ROWS = 3;
const GALLERY_INITIAL_COUNT = GALLERY_COLUMNS * GALLERY_INITIAL_ROWS;

type ExperienceLandingGalleryProps = {
  images: readonly string[];
};

export function ExperienceLandingGallery({ images }: ExperienceLandingGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const hasMore = images.length > GALLERY_INITIAL_COUNT;
  const visibleImages = showAll || !hasMore ? images : images.slice(0, GALLERY_INITIAL_COUNT);

  return (
    <section className="rounded-3xl border border-[#D0AE7D]/15 bg-white p-5 shadow-sm">
      <h2 className="text-center font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2717] sm:text-base">
        Hình ảnh thực tế
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {visibleImages.map((src, index) => (
          <div key={`${src}-${index}`} className="relative aspect-square overflow-hidden rounded-xl bg-[#E8E3DA]">
            <Image
              src={src}
              alt={`Ảnh trải nghiệm ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              loading={index < GALLERY_INITIAL_COUNT ? undefined : "lazy"}
            />
          </div>
        ))}
      </div>
      {hasMore ? (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          aria-expanded={showAll}
          className="mt-4 w-full rounded-xl border border-[#D0AE7D]/30 py-2.5 font-[family-name:var(--font-inter)] text-sm font-medium text-[#1F2717] transition hover:bg-[#D0AE7D]/10"
        >
          {showAll ? "Thu gọn" : "Xem thêm ảnh"}
        </button>
      ) : null}
    </section>
  );
}
