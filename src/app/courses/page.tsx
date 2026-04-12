import { CourseCard } from "@/components/CourseCard";
import { courses, continents, countries, difficulties, availabilities } from "@/data/courses";
import { CourseFilters } from "@/components/CourseFilters";

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;
  const { continent, country, difficulty, maxGreenFee, availability } = params;

  const filtered = courses.filter((course) => {
    if (continent && course.continent !== continent) return false;
    if (country && course.country !== country) return false;
    if (difficulty && course.difficulty !== difficulty) return false;
    if (maxGreenFee && course.greenFee.min > Number(maxGreenFee)) return false;
    if (availability && course.availability !== availability) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          Directory
        </p>
        <h1 className="text-3xl font-bold text-primary mb-2">All Links Courses</h1>
        <p className="text-muted-foreground">
          {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
          {continent || country || difficulty ? " · Filters applied" : ""}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-64 shrink-0">
          <CourseFilters
            continents={continents}
            countries={countries}
            difficulties={difficulties}
            availabilities={availabilities}
            active={{
              continent,
              country,
              difficulty,
              maxGreenFee: maxGreenFee ? Number(maxGreenFee) : undefined,
              availability,
            }}
          />
        </aside>

        {/* Course grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No courses match your filters.</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
