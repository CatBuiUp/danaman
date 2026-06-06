"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SLIDE_DURATION_MS = 3500;
const FADE_DURATION_MS = 700;

type ExperienceLandingVideoPreviewProps = {
  images: readonly string[];
  fallbackImage: string;
  videoDuration: string;
};

export function ExperienceLandingVideoPreview({
  images,
  fallbackImage,
  videoDuration,
}: ExperienceLandingVideoPreviewProps) {
  const slides = images.length > 0 ? images : [fallbackImage];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideEpoch, setSlideEpoch] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setSlideEpoch((epoch) => epoch + 1);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying, slides.length]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((playing) => {
      if (playing) {
        setCurrentIndex(0);
        setSlideEpoch(0);
      }
      return !playing;
    });
  }, []);

  return (
    <section>
      <h2 className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2717] sm:text-base">
        <CameraIcon />
        Xem trước trải nghiệm
      </h2>
      <div className="relative mt-4 overflow-hidden rounded-2xl">
        <div className="relative aspect-video w-full bg-[#25301C]">
          {slides.map((src, index) => {
            const isActive = index === currentIndex;
            const isVisible = isPlaying ? isActive : index === 0;

            return (
              <div
                key={src}
                aria-hidden={!isVisible}
                className={`absolute inset-0 overflow-hidden transition-opacity ease-in-out ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
              >
                <Image
                  key={isPlaying && isActive ? `slide-${currentIndex}-${slideEpoch}` : `slide-${index}`}
                  src={src}
                  alt={`Video preview trải nghiệm ${index + 1}`}
                  fill
                  priority={index === 0}
                  className={`object-cover ${
                    !isPlaying && index === 0 ? "opacity-80" : ""
                  } ${isPlaying && isActive ? "animate-experience-preview-zoom" : ""}`}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            );
          })}

          <div
            className={`absolute inset-0 flex items-center justify-center transition-colors duration-500 ${
              isPlaying ? "bg-black/10" : "bg-black/25"
            }`}
          >
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? "Tạm dừng video xem trước" : "Phát video xem trước"}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#1F2717] shadow-lg transition hover:scale-105 hover:bg-white active:scale-95"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>

          <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 font-[family-name:var(--font-inter)] text-xs text-white">
            {videoDuration}
          </span>
        </div>
      </div>
    </section>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#B08D57]" fill="none" aria-hidden>
      <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7l1.5-2h3L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M7 5h4v14H7V5zm6 0h4v14h-4V5z" />
    </svg>
  );
}
