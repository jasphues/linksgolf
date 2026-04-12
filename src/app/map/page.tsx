import { courses } from "@/data/courses";
import { MapPin } from "lucide-react";
import { MapWrapper } from "@/components/MapWrapper";

const mapCourses = courses.map((c) => ({
  slug: c.slug,
  name: c.name,
  country: c.country,
  ranking: c.ranking,
  coordinates: c.coordinates,
  greenFee: c.greenFee,
}));

export const metadata = {
  title: "Course Map — LINKSGOLF",
  description: "Interactive map of the world's finest links golf courses.",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
            World Map
          </p>
        </div>
        <h1 className="text-3xl font-bold text-primary">Links Golf — Global</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">
          {courses.length} courses across 5 continents. Click any marker to explore.
        </p>
      </div>

      {/* Map */}
      <MapWrapper courses={mapCourses} />

      {/* Legend / quick stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Europe", count: courses.filter((c) => c.continent === "europe").length },
          { label: "North America", count: courses.filter((c) => c.continent === "north-america").length },
          { label: "Oceania", count: courses.filter((c) => c.continent === "oceania").length },
          { label: "Africa", count: courses.filter((c) => c.continent === "africa").length },
        ].map(({ label, count }) => (
          <div key={label} className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: "#295336" }}
            />
            <div>
              <p className="text-sm font-semibold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
