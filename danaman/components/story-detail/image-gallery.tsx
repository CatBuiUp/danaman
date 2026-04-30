"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeImage, setActiveImage] = useState(validImages[0] ?? "");

  return (
    <div className="space-y-4">
      <div className="relative h-[380px] overflow-hidden rounded-2xl bg-zinc-100 md:h-[460px]">
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
