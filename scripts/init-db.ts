import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  console.log("Creating tables...")

  // Create the WaitlistSubscriber table
  await sql`
    CREATE TABLE IF NOT EXISTS "WaitlistSubscriber" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "firstName" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "condition" TEXT NOT NULL,
      "source" TEXT,
      "consentGiven" BOOLEAN NOT NULL
    );
  `

  // Create index on createdAt
  await sql`
    CREATE INDEX IF NOT EXISTS "WaitlistSubscriber_createdAt_idx" ON "WaitlistSubscriber"("createdAt");
  `

  console.log("✓ Database initialized successfully")
}

main().catch((err) => {
  console.error("Error initializing database:", err)
  process.exit(1)
})
