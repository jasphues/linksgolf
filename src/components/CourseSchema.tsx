import type { GolfCourse } from "@/types";
import { getSeededRating, getCourseFAQs } from "@/lib/course-utils";

interface Props {
  course: GolfCourse;
}

export function CourseSchema({ course }: Props) {
  const { rating, reviewCount } = getSeededRating(course.ranking);
  const faqs = getCourseFAQs(course);

  const golfCourseSchema = {
    "@context": "https://schema.org",
    "@type": "GolfCourse",
    name: course.name,
    description: course.longDescription || course.description,
    url: `https://linksgolf.xyz/courses/${course.slug}`,
    image: course.images.slice(0, 5),
    address: {
      "@type": "PostalAddress",
      addressLocality: course.location.split(",")[0]?.trim() ?? course.location,
      addressRegion: course.region,
      addressCountry: course.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: course.coordinates.lat,
      longitude: course.coordinates.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: `${course.greenFee.currency} ${course.greenFee.min}–${course.greenFee.max}`,
    publicAccess: !course.membershipRequired,
    ...(course.website ? { sameAs: [course.website] } : {}),
    ...(course.yearBuilt ? { foundingDate: course.yearBuilt.toString() } : {}),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(golfCourseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
