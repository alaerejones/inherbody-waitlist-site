import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

interface WaitlistRequest {
  firstName: string
  email: string
  whatsapp: string
  condition: string[] | string
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

    // Normalize inputs
    const firstName = body.firstName?.trim()
    const email = body.email?.trim().toLowerCase()
    const whatsapp = body.whatsapp?.trim()

    // Normalize condition (allow multiple)
    const condition =
      Array.isArray(body.condition)
        ? body.condition.join(", ")
        : body.condition

    // Validation
    if (!firstName) {
      return Response.json({ error: "First name is required." }, { status: 400 })
    }

    if (!email || !isValidEmail(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    const isValidWhatsApp = /^\+\d{8,15}$/
    if (!whatsapp || !isValidWhatsApp.test(whatsapp)) {
      return Response.json(
        { error: "Please provide a valid WhatsApp number with country code." },
        { status: 400 }
      )
    }

    if (!body.consentGiven) {
      return Response.json({ error: "You must consent to receive updates." }, { status: 400 })
    }

    if (!condition || condition.trim() === "") {
      return Response.json({ error: "Please select at least one option." }, { status: 400 })
    }

    // Check if email already exists
    const existing = await sql`
      SELECT id FROM "WaitlistSubscriber" WHERE email = ${email};
    `

    if (existing.length > 0) {
      return Response.json({ message: "You are already on the waitlist." }, { status: 200 })
    }

    // Create new subscriber
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

    await sql`
      INSERT INTO "WaitlistSubscriber" (
        id,
        "firstName",
        email,
        whatsapp,
        condition,
        source,
        "consentGiven"
      )
      VALUES (
        ${id},
        ${firstName},
        ${email},
        ${whatsapp},
        ${condition},
        ${body.source || null},
        true
      );
    `

    return Response.json({ message: "Thank you for joining the waitlist!" }, { status: 200 })
  } catch (error) {
    console.error("Waitlist API error:", error)
    return Response.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    )
  }
}