"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ImageGalleryProps = {
  images: string[];
  title: string;
  description?: string;
};

export function ImageGallery({ images, title, description }: ImageGalleryProps) {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeImage, setActiveImage] = useState(validImages[0] ?? "");
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-w-0 max-w-full space-y-4">
      <div className="relative h-[380px] max-w-full overflow-hidden rounded-2xl bg-zinc-100 md:h-[460px]">
        {activeImage ? (
          <Image
            key={activeImage}
            src={activeImage}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 text-white sm:p-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Về trang chủ"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/35 backdrop-blur transition hover:bg-black/55"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <button
              type="button"
              aria-label={liked ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
              aria-pressed={liked}
              onClick={() => setLiked((prev) => !prev)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition ${
                liked ? "bg-rose-500/90 text-white" : "bg-black/35 text-white hover:bg-black/55"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s-6.7-4.35-9.33-8.2C.86 10.15 1.66 6.5 4.9 5.2 7.07 4.33 9.06 5.1 10.2 6.55L12 8.8l1.8-2.25c1.14-1.45 3.13-2.22 5.3-1.35 3.24 1.3 4.04 4.95 2.23 7.6C18.7 16.65 12 21 12 21z"
                />
              </svg>
            </button>
          </div>

          <div className="max-w-[90%] space-y-2">
            <h1 className="text-3xl font-bold leading-tight drop-shadow-md sm:text-4xl">{title}</h1>
            {description ? (
              <p className="max-w-xl text-base font-medium text-white/90 drop-shadow-md line-clamp-2 sm:line-clamp-none">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {validImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border transition ${
              activeImage === image
                ? "border-sky-500 ring-2 ring-sky-200"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`${title} - ${index + 1}`}
              fill
              className="object-cover"
              sizes="112px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
