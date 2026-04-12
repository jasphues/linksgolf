import { neon } from "@neondatabase/serverless";

function createDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return sql;
}

let _sql: ReturnType<typeof createDb> | null = null;

export function getSql(): ReturnType<typeof createDb> {
  if (!_sql) _sql = createDb();
  return _sql!;
}

export async function initDb() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      num_golfers INTEGER,
      origin VARCHAR(255),
      destination VARCHAR(100),
      max_green_fee INTEGER,
      skill_level VARCHAR(50),
      priorities TEXT[],
      hotel_stars INTEGER,
      wants_wellness BOOLEAN,
      travel_month VARCHAR(50),
      recommended_courses TEXT[],
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}
