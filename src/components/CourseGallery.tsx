"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  courseName: string;
}

const labels = ["fairway", "links hole", "coastal view", "green", "clubhouse", "approach view"];

export function CourseGallery({ images, courseName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* Gallery — horizontal scroll on mobile, 2-col grid on sm+ */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 touch-pan-x sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="relative h-56 rounded-xl overflow-hidden bg-muted shrink-0 w-[82vw] sm:w-auto snap-start cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={img}
              alt={`${courseName} — ${labels[i % labels.length]}`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-7 w-7" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 z-10 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full max-w-5xl mx-16 sm:mx-24 aspect-[3/2]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${courseName} — ${labels[lightboxIndex % labels.length]}`}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 z-10 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          )}

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
            {lightboxIndex + 1} / {images.length}
          </p>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === lightboxIndex ? "w-4 bg-white" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
