import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

interface WaitlistRequest {
  firstName: string
  email: string
  condition: string
  source?: string
  consentGiven: boolean
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: Request) {
  try {
    const body: WaitlistRequest = await request.json()

    // Validation
    if (!body.firstName || body.firstName.trim() === "") {
      return Response.json({ error: "First name is required." }, { status: 400 })
    }

    if (!body.email || !isValidEmail(body.email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    if (!body.consentGiven) {
      return Response.json({ error: "You must consent to receive updates." }, { status: 400 })
    }

    if (!body.condition || body.condition === "") {
      return Response.json({ error: "Please select a condition." }, { status: 400 })
    }

    // Check if email already exists
    const existing = await sql`
      SELECT id FROM "WaitlistSubscriber" WHERE email = ${body.email.toLowerCase()};
    `

    if (existing.length > 0) {
      return Response.json({ message: "You are already on the waitlist." }, { status: 200 })
    }

    // Create new subscriber
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    await sql`
      INSERT INTO "WaitlistSubscriber" (id, "firstName", email, condition, source, "consentGiven")
      VALUES (${id}, ${body.firstName}, ${body.email.toLowerCase()}, ${body.condition}, ${body.source || null}, true);
    `

    return Response.json({ message: "Thank you for joining the waitlist!" }, { status: 200 })
  } catch (error) {
    console.error("Waitlist API error:", error)
    return Response.json({ error: "An error occurred. Please try again later." }, { status: 500 })
  }
}
