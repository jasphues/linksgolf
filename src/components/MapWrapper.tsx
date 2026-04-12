"use client";

import dynamic from "next/dynamic";
import type { GolfCourse } from "@/types";

const CourseMap = dynamic(
  () => import("@/components/CourseMap").then((m) => m.CourseMap),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#0f1117] rounded-xl animate-pulse" />,
  }
);

type Props = {
  courses: Pick<GolfCourse, "slug" | "name" | "country" | "ranking" | "coordinates" | "greenFee">[];
};

export function MapWrapper({ courses }: Props) {
  return (
    <div className="h-[60vh] min-h-[480px] rounded-xl overflow-hidden border border-border shadow-lg">
      <CourseMap courses={courses} />
    </div>
  );
}
