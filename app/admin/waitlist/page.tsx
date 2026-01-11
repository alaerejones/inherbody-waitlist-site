"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Subscriber {
  id: string
  firstName: string
  email: string
  whatsapp: string
  condition: string
  createdAt: string
}

export default function AdminWaitlist() {
  const router = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [error, setError] = useState("")

  const totalSubscribers = subscribers.length

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        setError("Invalid password.")
        return
      }

      setIsAuthenticated(true)
      router.push("?auth=1")
    } catch {
      setError("Login failed. Try again.")
    } finally {
      setIsAuthLoading(false)
    }
  }

  const fetchSubscribers = async () => {
    setIsDataLoading(true)

    try {
      const response = await fetch("/api/admin/subscribers", {
        headers: { "x-admin-password": password },
      })

      if (response.ok) {
        const data = await response.json()
        setSubscribers(data)
      } else {
        setError("Failed to load subscribers.")
      }
    } catch {
      setError("Failed to load subscribers.")
    } finally {
      setIsDataLoading(false)
    }
  }

  const handleExportCSV = async () => {
    const response = await fetch("/api/admin/export-csv", {
      headers: { "x-admin-password": password },
    })

    if (!response.ok) return

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `inherbody-waitlist-${new Date().toISOString().split("T")[0]}.csv`
    a.click()

    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (!isAuthenticated) return

    fetchSubscribers()

    const interval = setInterval(fetchSubscribers, 30000)
    return () => clearInterval(interval)
  }, [isAuthenticated])

  /* ---------- LOGIN ---------- */

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <h1 className="text-xl font-semibold mb-6">Admin Access</h1>

          {error && (
            <div className="mb-4 p-3 text-sm bg-red-50 border border-red-200 rounded text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border rounded focus:ring-2 focus:ring-[#655A9C]"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-2 bg-[#655A9C] text-white rounded font-medium disabled:opacity-50"
            >
              {isAuthLoading ? "Checking..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ---------- DASHBOARD ---------- */

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold">Waitlist</h1>
            <p className="text-sm text-gray-500">
              Total joined: <span className="font-semibold text-gray-900">{totalSubscribers}</span>
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#F58D8C] text-white rounded text-sm"
          >
            Export CSV
          </button>
        </div>

        {isDataLoading ? (
          <div className="bg-white rounded p-8 text-center text-gray-500">
            Loading subscribers...
          </div>
        ) : subscribers.length === 0 ? (
          <div className="bg-white rounded p-8 text-center text-gray-500">
            No subscribers yet.
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">WhatsApp</th>
                  <th className="px-6 py-3 text-left">Condition</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4">{sub.firstName}</td>
                    <td className="px-6 py-4 text-gray-600">{sub.email}</td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://wa.me/${sub.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        className="text-[#25D366] font-medium"
                      >
                        {sub.whatsapp}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{sub.condition}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}