import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Star,
  Trophy,
  Users,
  Clock,
  ChevronLeft,
  ExternalLink,
  Wifi,
  Dumbbell,
  Plane,
  Hotel,
  Calculator,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCourseBySlug, courses } from "@/data/courses";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.name} — Golf Links`,
    description: course.description,
  };
}

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const availabilityLabels = {
  easy: "Easy to book",
  moderate: "Moderate",
  difficult: "Difficult",
  "very-difficult": "Very difficult",
};

const availabilityColors = {
  easy: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  difficult: "bg-orange-100 text-orange-800",
  "very-difficult": "bg-red-100 text-red-800",
};

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative h-[60vh] min-h-[400px] bg-primary">
        <Image
          src={course.heroImage}
          alt={course.name}
          fill
          priority
          className="object-cover opacity-70"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

        {/* Back link */}
        <div className="absolute top-6 left-4 sm:left-8">
          <Link href="/courses" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-white hover:bg-white/20 hover:text-white")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            All Courses
          </Link>
        </div>

        {/* Course title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {course.ranking && (
                <span className="bg-[var(--gold)] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  Ranked #{course.ranking}
                </span>
              )}
              <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-md">
                {course.country}
              </span>
              {course.hostMajors.length > 0 && (
                <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  Major venue
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {course.name}
            </h1>
            <p className="mt-2 text-white/80 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" />
              {course.location}
            </p>
          </div>
        </div>
      </div>

      {/* ── Trip Budget Strip ── */}
      {course.nearestAirport && (
        <div className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
              {/* Airport */}
              <div className="pl-0 md:pl-0 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-1">
                  <Plane className="h-3.5 w-3.5" />
                  Nearest Airport
                </div>
                <p className="font-semibold text-sm">
                  {course.nearestAirport.name}{" "}
                  <span className="text-white/50 font-normal">({course.nearestAirport.iata})</span>
                </p>
                <p className="text-xs text-white/60">
                  {course.nearestAirport.distanceKm} km · ~{course.nearestAirport.transferMinutes} min transfer
                </p>
              </div>

              {/* Transfer */}
              <div className="pl-6 flex flex-col gap-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-1">
                  Airport Transfer
                </div>
                <p className="font-semibold text-sm">≈ €{course.nearestAirport.transferCostEur}</p>
                <p className="text-xs text-white/60">One way, taxi/shuttle</p>
              </div>

              {/* Hotel */}
              {course.hotels.length > 0 && (
                <div className="pl-6 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-1">
                    <Hotel className="h-3.5 w-3.5" />
                    Hotel per Night
                  </div>
                  <p className="font-semibold text-sm">
                    {course.hotels[0].pricePerNight.currency}{" "}
                    {course.hotels[0].pricePerNight.min}–{course.hotels[0].pricePerNight.max}
                  </p>
                  <p className="text-xs text-white/60 truncate">{course.hotels[0].name}</p>
                </div>
              )}

              {/* Trip estimate */}
              {course.hotels.length > 0 && (() => {
                const ap = course.nearestAirport!;
                const h = course.hotels[0].pricePerNight;
                const toEur = (v: number, cur: string) =>
                  cur === "GBP" ? Math.round(v * 1.2)
                  : cur === "USD" || cur === "AUD" || cur === "NZD" ? Math.round(v * 0.85)
                  : v;
                const estimate = ap.transferCostEur * 2 + toEur(h.min, h.currency) * 3 + toEur(course.greenFee.min, course.greenFee.currency);
                return (
                  <div className="pl-6 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-1">
                      <Calculator className="h-3.5 w-3.5" />
                      3-Night Estimate
                    </div>
                    <p className="text-2xl font-bold">≈ €{estimate.toLocaleString()}</p>
                    <p className="text-xs text-white/60">Transfer + hotel + green fee</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">About the Course</h2>
              <p className="text-foreground leading-relaxed">{course.longDescription}</p>
            </div>

            {/* Image gallery */}
            {course.images.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.images.map((img, i) => (
                    <div key={i} className="relative h-56 rounded-xl overflow-hidden bg-muted">
                      <Image
                        src={img}
                        alt={`${course.name} view ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Features */}
            {course.features.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Course Highlights</h2>
                <div className="flex flex-wrap gap-2">
                  {course.features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-full border border-border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {course.awards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Awards & Recognition</h2>
                <ul className="space-y-2">
                  {course.awards.map((award) => (
                    <li key={award} className="flex items-center gap-2 text-sm text-foreground">
                      <Trophy className="h-4 w-4 text-[var(--gold)] shrink-0" />
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visitor Info */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Visitor Information</h2>
              <div className="bg-secondary rounded-xl p-5 space-y-3">
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-medium">Guest Policy: </span>
                  {course.guestPolicy}
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.bestMonths.map((month) => (
                    <span key={month} className="bg-background text-foreground text-xs px-2.5 py-1 rounded-full border border-border">
                      {month}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Best months to visit</p>
              </div>
            </div>

            {/* Hotels */}
            {course.hotels.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Where to Stay</h2>
                <div className="space-y-4">
                  {course.hotels.map((hotel) => (
                    <div
                      key={hotel.name}
                      className="border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                    >
                      {/* Hotel image strip */}
                      {hotel.images && hotel.images.length > 0 && (
                        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${Math.min(hotel.images.length, 3)}, 1fr)` }}>
                          {hotel.images.slice(0, 3).map((img, i) => (
                            <div key={i} className="relative h-40 overflow-hidden">
                              <Image
                                src={img}
                                alt={`${hotel.name} ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, 20vw"
                                unoptimized
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-semibold text-foreground">{hotel.name}</h3>
                              <div className="flex">
                                {Array.from({ length: hotel.stars }).map((_, i) => (
                                  <Star key={i} className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                              {hotel.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {hotel.hasWellness && (
                                <span className="flex items-center gap-1 text-xs bg-secondary px-2.5 py-1 rounded-full">
                                  <Wifi className="h-3 w-3" />
                                  Wellness
                                </span>
                              )}
                              {hotel.hasSpa && (
                                <span className="flex items-center gap-1 text-xs bg-secondary px-2.5 py-1 rounded-full">
                                  <Dumbbell className="h-3 w-3" />
                                  Spa
                                </span>
                              )}
                              <span className="text-xs bg-secondary px-2.5 py-1 rounded-full">
                                {hotel.distanceKm < 1
                                  ? `${hotel.distanceKm * 1000}m from course`
                                  : `${hotel.distanceKm}km from course`}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-foreground">
                              {hotel.pricePerNight.currency} {hotel.pricePerNight.min}–{hotel.pricePerNight.max}
                            </p>
                            <p className="text-xs text-muted-foreground">per night</p>
                            {hotel.website && (
                              <a
                                href={hotel.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                              >
                                View hotel
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restaurants */}
            {course.restaurants.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Where to Eat</h2>
                <div className="space-y-3">
                  {course.restaurants.map((restaurant) => (
                    <div
                      key={restaurant.name}
                      className="border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-foreground">{restaurant.name}</h3>
                            {restaurant.michelinStars && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                {"⭐".repeat(restaurant.michelinStars)} Michelin
                              </span>
                            )}
                            {restaurant.onsite && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                On-site
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-medium text-foreground">{restaurant.priceRange}</span>
                          <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Quick facts card */}
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-5">Course Details</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Green Fee</span>
                  <span className="font-semibold text-foreground">
                    {course.greenFee.currency} {course.greenFee.min.toLocaleString()}
                    {course.greenFee.min !== course.greenFee.max &&
                      `–${course.greenFee.max.toLocaleString()}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Difficulty</span>
                  <Badge variant="secondary">{difficultyLabels[course.difficulty]}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Availability</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${availabilityColors[course.availability]}`}>
                    {availabilityLabels[course.availability]}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Par / Yards</span>
                  <span className="font-semibold text-foreground">
                    {course.par} / {course.yards.toLocaleString()}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Holes</span>
                  <span className="font-semibold text-foreground">{course.holes}</span>
                </div>
                {course.yearBuilt && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">{course.yearBuilt}</span>
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex justify-between items-start text-sm">
                  <span className="text-muted-foreground">Architect</span>
                  <span className="font-semibold text-foreground text-right max-w-32 leading-snug">
                    {course.architects.join(", ")}
                  </span>
                </div>
                {course.shaper && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Shaper</span>
                      <span className="font-semibold text-foreground">{course.shaper}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/finder" className={cn(buttonVariants(), "w-full justify-center")}>
                  Get a Recommendation
                </Link>
                {course.website && (
                  <a
                    href={course.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
                  >
                    Official Website
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
