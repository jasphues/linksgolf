"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import type { GolfCourse } from "@/types";
import { cn } from "@/lib/utils";

const difficultyConfig = {
  beginner: { label: "Beginner", class: "bg-green-100 text-green-800" },
  intermediate: { label: "Intermediate", class: "bg-blue-100 text-blue-800" },
  advanced: { label: "Advanced", class: "bg-orange-100 text-orange-800" },
  expert: { label: "Expert", class: "bg-red-100 text-red-800" },
};

const availabilityConfig = {
  easy: { label: "Easy to book", dot: "bg-green-500" },
  moderate: { label: "Moderate", dot: "bg-yellow-500" },
  difficult: { label: "Difficult", dot: "bg-orange-500" },
  "very-difficult": { label: "Very hard", dot: "bg-red-500" },
};

interface CourseCardProps {
  course: GolfCourse;
  featured?: boolean;
}

export function CourseCard({ course, featured = false }: CourseCardProps) {
  const diff = difficultyConfig[course.difficulty];
  const avail = availabilityConfig[course.availability];

  // Build image list: heroImage first, then any non-picsum extras
  const images = [
    course.heroImage,
    ...course.images.filter(
      (img) => !img.includes("picsum.photos") && img !== course.heroImage
    ),
  ];

  const [idx, setIdx] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  };

  const goTo = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx(i);
  };

  return (
    <div
      className={cn(
        "group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300",
        featured && "ring-1 ring-[var(--gold)]/30"
      )}
    >
      {/* ── Image carousel ── */}
      <div className={cn("relative overflow-hidden", featured ? "h-64" : "h-52")}>
        <Link href={`/courses/${course.slug}`} className="absolute inset-0 z-0">
          <Image
            key={images[idx]}
            src={images[idx]}
            alt={course.name}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </Link>

        {/* Ranking badge */}
        {course.ranking && (
          <div className="absolute top-3 left-3 z-10 bg-[var(--gold)] text-white text-xs font-bold px-2 py-1 rounded-md">
            #{course.ranking}
          </div>
        )}

        {/* Difficulty */}
        <div className="absolute top-3 right-3 z-10">
          <span className={cn("text-xs font-medium px-2 py-1 rounded-md", diff.class)}>
            {diff.label}
          </span>
        </div>

        {/* Arrow navigation — only when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dot indicators (max 8 shown) */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
              {images.slice(0, 8).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => goTo(e, i)}
                  className={cn(
                    "rounded-full transition-all",
                    i === idx
                      ? "w-3 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            {/* Image counter */}
            <div className="absolute bottom-3 right-3 z-10 text-xs text-white/70 font-medium tabular-nums">
              {idx + 1}/{images.length}
            </div>
          </>
        )}

        {/* Location overlay */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-white text-sm">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium">{course.country}</span>
        </div>
      </div>

      {/* ── Content (full link) ── */}
      <Link href={`/courses/${course.slug}`} className="block p-5">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
          {course.shortName}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="h-3.5 w-3.5" />
            <span>
              {course.greenFee.currency} {course.greenFee.min.toLocaleString()}–{course.greenFee.max.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={cn("inline-block h-2 w-2 rounded-full", avail.dot)} />
            <span className="text-muted-foreground text-xs">{avail.label}</span>
          </div>
        </div>

        {course.architects[0] && (
          <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
            <span className="font-medium">Architect:</span> {course.architects[0]}
            {course.yearBuilt && (
              <span className="ml-2 text-muted-foreground/60">· Est. {course.yearBuilt}</span>
            )}
          </p>
        )}
      </Link>
    </div>
  );
}
