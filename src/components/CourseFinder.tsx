"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import type { GolfCourse, FinderAnswers, Difficulty, Continent } from "@/types";

const TOTAL_STEPS = 8;

type Step = {
  id: number;
  title: string;
  subtitle: string;
};

const steps: Step[] = [
  { id: 1, title: "How many golfers?", subtitle: "Including yourself" },
  { id: 2, title: "Where are you travelling from?", subtitle: "Your home country or city" },
  { id: 3, title: "Which region interests you?", subtitle: "Or choose any — we'll surprise you" },
  { id: 4, title: "What's your skill level?", subtitle: "Be honest — links golf can be humbling" },
  { id: 5, title: "Max green fee per round?", subtitle: "Approximate budget per person" },
  { id: 6, title: "What matters most to you?", subtitle: "Select all that apply" },
  { id: 7, title: "Hotel preferences?", subtitle: "For the ladies and non-golfers in your group" },
  { id: 8, title: "Where should we send your matches?", subtitle: "We'll email your personalised recommendations" },
];

const regionOptions: { value: Continent | "any"; label: string; flag: string }[] = [
  { value: "any", label: "Surprise me", flag: "🌍" },
  { value: "europe", label: "Europe (Scotland, Ireland, England)", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { value: "north-america", label: "North America", flag: "🇺🇸" },
  { value: "oceania", label: "Oceania (Australia, NZ)", flag: "🇦🇺" },
  { value: "asia", label: "Asia", flag: "🌏" },
  { value: "africa", label: "Africa", flag: "🌍" },
];

const skillOptions: { value: Difficulty; label: string; description: string }[] = [
  { value: "beginner", label: "Beginner", description: "New to golf or still learning" },
  { value: "intermediate", label: "Intermediate", description: "Handicap 19–28, enjoy a challenge" },
  { value: "advanced", label: "Advanced", description: "Handicap 9–18, comfortable on links" },
  { value: "expert", label: "Expert", description: "Handicap 0–9, love the toughest tests" },
];

const priorityOptions = [
  "Spectacular scenery",
  "Historic course",
  "Championship pedigree",
  "Great value",
  "Easy to book",
  "5-star hotels nearby",
  "Wellness & spa",
  "Family-friendly",
  "Remote & peaceful",
  "Drone video content",
];

const greenFeeOptions = [
  { value: 100, label: "Up to £100" },
  { value: 200, label: "Up to £200" },
  { value: 300, label: "Up to £300" },
  { value: 500, label: "Up to £500" },
  { value: 9999, label: "No limit" },
];

const hotelOptions = [
  { value: 3, label: "3 stars", description: "Comfortable & affordable" },
  { value: 4, label: "4 stars", description: "High quality with good amenities" },
  { value: 5, label: "5 stars", description: "The very best — luxury is important" },
];

function getRecommendations(answers: FinderAnswers): GolfCourse[] {
  let scored = courses.map((course) => {
    let score = 0;

    // Continent match
    if (answers.destination === "any" || course.continent === answers.destination) score += 30;

    // Difficulty match
    const diffMap: Record<Difficulty, number> = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    const courseDiff = diffMap[course.difficulty];
    const userDiff = diffMap[answers.skillLevel];
    score -= Math.abs(courseDiff - userDiff) * 10;

    // Green fee match
    if (course.greenFee.min <= answers.maxGreenFee) score += 20;
    if (course.greenFee.max <= answers.maxGreenFee) score += 10;

    // Priority matches
    if (answers.priorities.includes("Spectacular scenery") && course.features.some(f => f.toLowerCase().includes("view") || f.toLowerCase().includes("sea") || f.toLowerCase().includes("ocean"))) score += 10;
    if (answers.priorities.includes("Historic course") && (course.yearBuilt ?? 9999) < 1920) score += 15;
    if (answers.priorities.includes("Championship pedigree") && course.hostMajors.length > 0) score += 15;
    if (answers.priorities.includes("Easy to book") && course.availability === "easy") score += 20;
    if (answers.priorities.includes("Great value") && course.greenFee.min < 150) score += 15;
    if (answers.priorities.includes("5-star hotels nearby") && course.hotels.some(h => h.stars === 5)) score += 10;
    if (answers.priorities.includes("Wellness & spa") && course.hotels.some(h => h.hasWellness)) score += answers.wantsWellness ? 20 : 10;
    if (answers.wantsWellness && course.hotels.some(h => h.hasSpa)) score += 15;

    // Hotel star preference
    const hasMatchingHotel = course.hotels.some(h => h.stars >= answers.hotelStars);
    if (hasMatchingHotel) score += 10;

    // Ranking bonus
    if (course.ranking) score += Math.max(0, 20 - course.ranking);

    return { course, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.course);
}

const defaultAnswers: FinderAnswers = {
  numGolfers: 4,
  origin: "",
  destination: "any",
  maxGreenFee: 300,
  skillLevel: "advanced",
  priorities: [],
  hotelStars: 4,
  wantsWellness: false,
  travelMonth: "",
  email: "",
  name: "",
};

export function CourseFinder() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<FinderAnswers>(defaultAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<GolfCourse[]>([]);

  const update = <K extends keyof FinderAnswers>(key: K, value: FinderAnswers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const togglePriority = (p: string) => {
    setAnswers((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(p)
        ? prev.priorities.filter((x) => x !== p)
        : [...prev.priorities, p],
    }));
  };

  const canProceed = () => {
    if (step === 2 && !answers.origin.trim()) return false;
    if (step === 8 && (!answers.email.trim() || !answers.name.trim())) return false;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const recs = getRecommendations(answers);
    setRecommendations(recs);

    // Save lead to API
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          recommendedCourses: recs.map((c) => c.slug),
        }),
      });
    } catch {
      // Non-blocking — recommendations still show
    }

    setLoading(false);
    setSubmitted(true);
  };

  const progress = ((step - 1) / TOTAL_STEPS) * 100;

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <CheckCircle2 className="h-12 w-12 text-[var(--gold)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Your Perfect Courses</h2>
          <p className="text-muted-foreground">
            Based on your answers, here are your top recommendations. We&apos;ve also sent these to{" "}
            <strong>{answers.email}</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {recommendations.map((course, i) => (
            <div key={course.id}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                #{i + 1} Recommendation
              </p>
              <CourseCard course={course} featured />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setStep(1);
            setAnswers(defaultAnswers);
            setSubmitted(false);
          }}
          className="w-full"
        >
          Start over
        </Button>
      </div>
    );
  }

  const currentStep = steps[step - 1];

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--gold)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-1">{currentStep.title}</h2>
        <p className="text-muted-foreground">{currentStep.subtitle}</p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Step 1 — Number of golfers */}
        {step === 1 && (
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4, 6, 8, 10, 12].map((n) => (
              <button
                key={n}
                onClick={() => update("numGolfers", n)}
                className={`py-4 rounded-xl border text-lg font-semibold transition-all ${
                  answers.numGolfers === n
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — Origin */}
        {step === 2 && (
          <div>
            <Label htmlFor="origin">Country or City</Label>
            <Input
              id="origin"
              value={answers.origin}
              onChange={(e) => update("origin", e.target.value)}
              placeholder="e.g. Germany, London, New York..."
              className="mt-2 text-base"
              autoFocus
            />
          </div>
        )}

        {/* Step 3 — Destination */}
        {step === 3 && (
          <div className="space-y-2">
            {regionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update("destination", opt.value)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                  answers.destination === opt.value
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                <span className="text-xl">{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 4 — Skill level */}
        {step === 4 && (
          <div className="space-y-2">
            {skillOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update("skillLevel", opt.value)}
                className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
                  answers.skillLevel === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                <p className="font-semibold">{opt.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{opt.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 5 — Max green fee */}
        {step === 5 && (
          <div className="space-y-2">
            {greenFeeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update("maxGreenFee", opt.value)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${
                  answers.maxGreenFee === opt.value
                    ? "border-primary bg-primary/5 text-primary font-semibold"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Step 6 — Priorities */}
        {step === 6 && (
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((p) => (
              <button
                key={p}
                onClick={() => togglePriority(p)}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${
                  answers.priorities.includes(p)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Step 7 — Hotel preferences */}
        {step === 7 && (
          <div className="space-y-4">
            <div className="space-y-2">
              {hotelOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("hotelStars", opt.value)}
                  className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
                    answers.hotelStars === opt.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50 text-foreground"
                  }`}
                >
                  <p className="font-semibold">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => update("wantsWellness", !answers.wantsWellness)}
                className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
                  answers.wantsWellness
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                <p className="font-semibold">Wellness & Spa important</p>
                <p className="text-sm text-muted-foreground">For non-golfers in the group</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 8 — Contact details */}
        {step === 8 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={answers.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="First name"
                className="mt-2"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={answers.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className="mt-2"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We&apos;ll send your personalised course recommendations here. No spam, ever.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {step < TOTAL_STEPS ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
          >
            Continue
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed() || loading}
            className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-white border-0"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding matches...
              </>
            ) : (
              <>
                Show My Courses
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
