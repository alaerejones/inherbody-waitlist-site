import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

function validateAdminPassword(request: Request): boolean {
  const password = request.headers.get("x-admin-password")
  return password === process.env.ADMIN_PASSWORD
}

export async function GET(request: Request) {
  if (!validateAdminPassword(request)) {
    return Response.json({ error: "Not authorized." }, { status: 401 })
  }

  try {
    const subscribers = await sql`
      SELECT id, "firstName", email, condition, "createdAt" 
      FROM "WaitlistSubscriber" 
      ORDER BY "createdAt" DESC;
    `

    return Response.json(subscribers)
  } catch (error) {
    console.error("Admin subscribers error:", error)
    return Response.json({ error: "Failed to fetch subscribers." }, { status: 500 })
  }
}
