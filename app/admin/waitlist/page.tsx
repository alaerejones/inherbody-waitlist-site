"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Subscriber {
  id: string
  firstName: string
  email: string
  condition: string
  createdAt: string
}

export default function AdminWaitlist() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        fetchSubscribers()
      } else {
        setError("Invalid password.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/subscribers", {
        headers: { "x-admin-password": password },
      })

      if (response.ok) {
        const data = await response.json()
        setSubscribers(data)
      } else {
        setError("Failed to fetch subscribers.")
      }
    } catch {
      setError("An error occurred fetching subscribers.")
    }
  }

  const handleExportCSV = async () => {
    try {
      const response = await fetch("/api/admin/export-csv", {
        headers: { "x-admin-password": password },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `inherbody-waitlist-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch {
      setError("Failed to export CSV.")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#655A9C]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-[#655A9C] text-white rounded font-medium hover:bg-[#544890] disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Waitlist Subscribers</h1>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#F58D8C] text-white rounded font-medium hover:bg-[#e07a79] focus:outline-none focus:ring-2 focus:ring-[#F58D8C]"
          >
            Export CSV
          </button>
        </div>

        {subscribers.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">No subscribers yet.</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Condition</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{sub.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sub.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sub.condition}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(sub.createdAt).toLocaleDateString()}</td>
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
