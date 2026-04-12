import { CourseFinder } from "@/components/CourseFinder";

export const metadata = {
  title: "Course Finder — Golf Links",
  description: "Answer a few questions and we'll recommend the perfect links course for your trip.",
};

export default function FinderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          Personalised
        </p>
        <h1 className="text-4xl font-bold text-primary mb-4">Find Your Perfect Course</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
          Answer a few quick questions and we&apos;ll match you with the ideal links courses for
          your trip, budget, and skill level.
        </p>
      </div>
      <CourseFinder />
    </div>
  );
}
