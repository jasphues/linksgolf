"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  courseName: string;
}

const labels = ["fairway", "links hole", "coastal view", "green", "clubhouse", "approach view"];

export function CourseGallery({ images, courseName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const prevGallery = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const nextGallery = () => setActiveIndex((i) => (i + 1) % images.length);

  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

  // Touch swipe for mobile gallery
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) nextGallery();
      else prevGallery();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Lightbox touch swipe
  const lbTouchStartX = useRef<number | null>(null);
  const lbTouchStartY = useRef<number | null>(null);
  const onLbTouchStart = (e: React.TouchEvent) => {
    lbTouchStartX.current = e.touches[0].clientX;
    lbTouchStartY.current = e.touches[0].clientY;
  };
  const onLbTouchEnd = (e: React.TouchEvent) => {
    if (lbTouchStartX.current === null || lbTouchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - lbTouchStartX.current;
    const dy = e.changedTouches[0].clientY - lbTouchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    lbTouchStartX.current = null;
    lbTouchStartY.current = null;
  };

  // Keyboard navigation for lightbox
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
      {/* ── Mobile: single-image carousel with swipe ── */}
      <div className="sm:hidden">
        <div
          className="relative h-56 rounded-xl overflow-hidden bg-muted select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => open(activeIndex)}
        >
          <Image
            src={images[activeIndex]}
            alt={`${courseName} — ${labels[activeIndex % labels.length]}`}
            fill
            className="object-cover"
            unoptimized
          />

          {images.length > 1 && (
            <>
              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prevGallery(); }}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/40 text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); nextGallery(); }}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/40 text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <span className="absolute top-3 right-3 text-xs text-white/80 bg-black/40 rounded-full px-2 py-0.5 tabular-nums">
              {activeIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>

      {/* ── Desktop: 2-col grid ── */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="relative h-56 rounded-xl overflow-hidden bg-muted cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={close}
          onTouchStart={onLbTouchStart}
          onTouchEnd={onLbTouchEnd}
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
