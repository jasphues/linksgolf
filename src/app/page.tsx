import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Star, Users, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";

const featuredCourses = courses.slice(0, 3);

const stats = [
  { icon: Globe, value: "20+", label: "Countries" },
  { icon: Star, value: "100+", label: "Courses" },
  { icon: MapPin, value: "5", label: "Continents" },
  { icon: Users, value: "10k+", label: "Golfers helped" },
];

const continentHighlights = [
  {
    name: "Scotland",
    description: "Birthplace of golf. Turnberry, Royal Dornoch, St Andrews — the ultimate links pilgrimage.",
    image: "https://images.squarespace-cdn.com/content/v1/6710e3464bdab217a2de96d7/79617b27-5ef0-47fd-bcd6-12cb712c880a/Kingsbarns+Aerial+9th+Gorse+2023.jpg",
    href: "/courses?country=Scotland",
    count: courses.filter((c) => c.country === "Scotland").length,
  },
  {
    name: "Ireland",
    description: "Wild Atlantic coastlines. Ballybunion, Lahinch, Old Head — unforgettable experiences.",
    image: "https://golfcoursegurus.com/photos/ireland/oldhead/large/Old%20Head%20aerial.jpg",
    href: "/courses?country=Ireland",
    count: courses.filter((c) => c.country === "Ireland").length,
  },
  {
    name: "North America",
    description: "Bandon Dunes, Cabot Cliffs — world-class links in spectacular settings.",
    image: "https://bandondunesgolf.com/wp-content/uploads/2022/04/Bandon-Dunes-Course-Background-1920x1091.jpg",
    href: "/courses?continent=north-america",
    count: courses.filter((c) => c.continent === "north-america").length,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        <Image
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/99/32/9f/rolling-fairways-high.jpg?w=1400&h=800&s=1"
          alt="Links golf course aerial view"
          fill
          priority
          className="object-cover opacity-40"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <p className="text-[var(--gold)] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            The World&apos;s Finest Links Courses
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Not Every Course
            <br />
            <span className="text-[var(--gold)]">Makes the Cut.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            The definitive guide to links golf — curated, ranked, and planned with AI. Every course, every hotel, every green fee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/finder" className={cn(buttonVariants({ size: "lg" }), "bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-white border-0 text-base px-8")}>
              Find My Perfect Course
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/courses" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60 text-base px-8")}>
              Browse All Courses
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/40 tracking-widest uppercase">
            ✦ AI-enabled course planning
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="h-6 w-6 mx-auto mb-2 text-[var(--gold)]" />
                <p className="text-3xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Top Ranked
            </p>
            <h2 className="text-3xl font-bold text-primary">World&apos;s #1–3 Links Courses</h2>
          </div>
          <Link href="/courses" className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:flex gap-1 text-muted-foreground")}>
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} featured />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link href="/courses" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}>View all courses</Link>
        </div>
      </section>

      {/* ── Destination Highlights ── */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Destinations
            </p>
            <h2 className="text-3xl font-bold text-primary">Explore by Region</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              From the wild coasts of Scotland and Ireland to the dramatic cliffs of North America
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {continentHighlights.map((dest) => (
              <Link
                key={dest.name}
                href={dest.href}
                className="group relative rounded-xl overflow-hidden h-72 block"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {dest.count} courses
                    </span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">{dest.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Finder CTA ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-primary rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--gold)_0%,_transparent_60%)]" />
          </div>
          <div className="relative z-10">
            <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Personalised Recommendations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Course to Pick?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
              Answer a few questions about your group, budget, and preferences — and we&apos;ll find your
              perfect links course.
            </p>
            <Link href="/finder" className={cn(buttonVariants({ size: "lg" }), "bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-white border-0 text-base px-10")}>
                Start the Course Finder
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
