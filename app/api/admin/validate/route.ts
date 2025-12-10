export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = body.password || ""

    if (password === process.env.ADMIN_PASSWORD) {
      return Response.json({ valid: true }, { status: 200 })
    }

    return Response.json({ valid: false }, { status: 401 })
  } catch (error) {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }
}
