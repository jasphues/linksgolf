import type { GolfCourse } from "@/types";

/** Deterministic "seeded" rating derived from ranking. No randomness — stays stable across builds. */
export function getSeededRating(ranking: number | undefined): { rating: number; reviewCount: number } {
  const rank = ranking ?? 60;
  // rating: rank 1 → 4.9, rank 82 → ~3.7, linear interpolation
  const raw = 4.9 - (rank - 1) * 0.016;
  const rating = Math.max(3.6, Math.round(raw * 10) / 10);

  // reviewCount: rank 1 → 290, rank 82 → ~60
  const reviewCount = Math.max(50, Math.round(300 - (rank - 1) * 2.8));

  return { rating, reviewCount };
}

export interface SeasonalFee {
  label: string;
  months: string[];
  fee: number;
  currency: string;
}

/** Derive three seasonal price tiers from the course's greenFee range. */
export function getSeasonalFees(course: GolfCourse): SeasonalFee[] {
  const { min, max, currency } = course.greenFee;
  const shoulder = Math.round((min + max) / 2);
  return [
    { label: "Peak Season", months: ["June", "July", "August"], fee: max, currency },
    { label: "Shoulder Season", months: ["April", "May", "September", "October"], fee: shoulder, currency },
    { label: "Off-Peak", months: ["November", "December", "January", "February", "March"], fee: min, currency },
  ];
}

/** Generate FAQ questions from course data. */
export interface FAQItem {
  question: string;
  answer: string;
}

export function getCourseFAQs(course: GolfCourse): FAQItem[] {
  const { min, max, currency } = course.greenFee;
  const feeText =
    min === max
      ? `${currency} ${min.toLocaleString()}`
      : `${currency} ${min.toLocaleString()}–${max.toLocaleString()}`;

  const difficultyText = {
    beginner: "suitable for beginners and high-handicap golfers",
    intermediate: "suitable for intermediate golfers with some links experience",
    advanced: "a challenging course best suited to low-handicap and advanced golfers",
    expert: "an extremely demanding course designed for expert golfers — a handicap certificate is typically required",
  }[course.difficulty];

  const faqs: FAQItem[] = [];

  // Green fee
  faqs.push({
    question: `What is the green fee at ${course.shortName}?`,
    answer:
      min === max
        ? `Green fees at ${course.name} are ${feeText} per round. Fees may vary by day of week and season — always check the official website for current pricing.`
        : `Green fees at ${course.name} range from ${feeText} depending on the time of year and day of the week. Peak summer rates apply from June to August, with lower rates available in the shoulder and off-peak seasons.`,
  });

  // Best time to visit
  if (course.bestMonths.length > 0) {
    const months =
      course.bestMonths.length === 1
        ? course.bestMonths[0]
        : `${course.bestMonths.slice(0, -1).join(", ")} and ${course.bestMonths[course.bestMonths.length - 1]}`;
    faqs.push({
      question: `When is the best time to play ${course.shortName}?`,
      answer: `The best months to visit ${course.name} are ${months}. During this period you can expect the most favourable weather conditions and the course in peak playing condition. The course typically plays year-round, though conditions in winter months can be challenging on a true links.`,
    });
  }

  // Difficulty
  faqs.push({
    question: `How difficult is ${course.shortName}?`,
    answer: `${course.name} is ${difficultyText}. The course plays to a par of ${course.par} over ${course.yards.toLocaleString()} yards. ${course.guestPolicy ? course.guestPolicy : ""}`,
  });

  // Architects
  if (course.architects.length > 0) {
    const archText =
      course.architects.length === 1
        ? course.architects[0]
        : `${course.architects.slice(0, -1).join(", ")} and ${course.architects[course.architects.length - 1]}`;
    faqs.push({
      question: `Who designed ${course.shortName}?`,
      answer: `${course.name} was designed by ${archText}.${course.yearBuilt ? ` The course was established in ${course.yearBuilt}` : ""}${course.yearRenovated ? ` and underwent significant restoration work in ${course.yearRenovated}` : ""}.`,
    });
  }

  // Nearest airport
  if (course.nearestAirport) {
    const ap = course.nearestAirport;
    faqs.push({
      question: `What is the nearest airport to ${course.shortName}?`,
      answer: `The nearest major airport to ${course.name} is ${ap.name} (${ap.iata}), approximately ${ap.distanceKm} km away. The transfer takes around ${ap.transferMinutes} minutes and costs approximately €${ap.transferCostEur} by taxi or private transfer.`,
    });
  }

  // Membership / visitor access
  faqs.push({
    question: `Can visitors play ${course.shortName}?`,
    answer: course.membershipRequired
      ? `${course.name} is a private members' club. Visitor access is limited and typically requires an invitation from a member. Contact the club directly for current visitor policies.`
      : `Yes, visitors are welcome at ${course.name}. ${course.guestPolicy}`,
  });

  return faqs;
}
