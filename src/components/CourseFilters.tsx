"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterOption {
  value: string;
  label: string;
}

interface CourseFiltersProps {
  continents: FilterOption[];
  countries: string[];
  difficulties: FilterOption[];
  availabilities: FilterOption[];
  active: {
    continent?: string;
    country?: string;
    difficulty?: string;
    maxGreenFee?: number;
    availability?: string;
  };
}

const greenFeeOptions = [
  { value: "100", label: "Up to £100" },
  { value: "200", label: "Up to £200" },
  { value: "300", label: "Up to £300" },
  { value: "500", label: "Up to £500" },
];

export function CourseFilters({
  continents,
  countries,
  difficulties,
  availabilities,
  active,
}: CourseFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/courses?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = () => router.push("/courses");

  const hasFilters = Object.values(active).some(Boolean);

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-muted-foreground hover:text-foreground h-7 px-2"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Continent */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Continent
        </Label>
        <div className="space-y-1.5">
          {continents.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                updateFilter("continent", active.continent === opt.value ? undefined : opt.value)
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                active.continent === opt.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Country */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Country
        </Label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() =>
                updateFilter("country", active.country === country ? undefined : country)
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                active.country === country
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Difficulty */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Difficulty
        </Label>
        <div className="space-y-1.5">
          {difficulties.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                updateFilter("difficulty", active.difficulty === opt.value ? undefined : opt.value)
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                active.difficulty === opt.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Max Green Fee */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Max Green Fee
        </Label>
        <div className="space-y-1.5">
          {greenFeeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                updateFilter(
                  "maxGreenFee",
                  active.maxGreenFee === Number(opt.value) ? undefined : opt.value
                )
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                active.maxGreenFee === Number(opt.value)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Availability
        </Label>
        <div className="space-y-1.5">
          {availabilities.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                updateFilter(
                  "availability",
                  active.availability === opt.value ? undefined : opt.value
                )
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                active.availability === opt.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
