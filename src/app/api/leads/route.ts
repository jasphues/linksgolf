import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      numGolfers,
      origin,
      destination,
      maxGreenFee,
      skillLevel,
      priorities,
      hotelStars,
      wantsWellness,
      travelMonth,
      recommendedCourses,
    } = body;

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    // Only write to DB if DATABASE_URL is configured
    if (process.env.DATABASE_URL) {
      const { getSql } = await import("@/lib/db");
      const sql = getSql();

      await sql`
        INSERT INTO leads (
          name, email, num_golfers, origin, destination,
          max_green_fee, skill_level, priorities, hotel_stars,
          wants_wellness, travel_month, recommended_courses
        ) VALUES (
          ${name}, ${email}, ${numGolfers}, ${origin}, ${destination},
          ${maxGreenFee}, ${skillLevel}, ${priorities ?? []}, ${hotelStars},
          ${wantsWellness ?? false}, ${travelMonth ?? ""}, ${recommendedCourses ?? []}
        )
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead save error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
