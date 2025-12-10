import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

function validateAdminPassword(request: Request): boolean {
  const password = request.headers.get("x-admin-password")
  return password === process.env.ADMIN_PASSWORD
}

function escapeCSV(field: string | null): string {
  if (field === null) return ""
  const stringField = String(field)
  if (stringField.includes(",") || stringField.includes('"') || stringField.includes("\n")) {
    return `"${stringField.replace(/"/g, '""')}"`
  }
  return stringField
}

export async function GET(request: Request) {
  if (!validateAdminPassword(request)) {
    return Response.json({ error: "Not authorized." }, { status: 401 })
  }

  try {
    const subscribers = await sql`
      SELECT "firstName", email, condition, source, "createdAt" 
      FROM "WaitlistSubscriber" 
      ORDER BY "createdAt" DESC;
    `

    // Build CSV
    const headers = ["First Name", "Email", "Condition", "Source", "Date Joined"]
    const rows = subscribers.map((sub: any) => [
      escapeCSV(sub.firstName),
      escapeCSV(sub.email),
      escapeCSV(sub.condition),
      escapeCSV(sub.source),
      escapeCSV(new Date(sub.createdAt).toISOString().split("T")[0]),
    ])

    const csv = [headers.join(","), ...rows.map((row: string[]) => row.join(","))].join("\n")

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="inherbody-waitlist-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Export CSV error:", error)
    return Response.json({ error: "Failed to export CSV." }, { status: 500 })
  }
}
