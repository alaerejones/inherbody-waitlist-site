"use client"

import type React from "react"

import { useState } from "react"

interface FormData {
  firstName: string
  email: string
  whatsapp: string
  condition: string
  source: string
  consentGiven: boolean
}

interface FormState {
  status: "idle" | "loading" | "success" | "error"
  message: string
  data: FormData
}

export default function WaitlistForm() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
    data: {
      firstName: "",
      email: "",
      whatsapp: "",
      condition: "",
      source: "",
      consentGiven: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: type === "checkbox" ? checked : value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidWhatsApp = /^\+\d{8,15}$/

    if (!isValidWhatsApp.test(formState.data.whatsapp)) {
      setFormState((prev) => ({
        ...prev,
        status: "error",
        message: "Please enter a valid WhatsApp number with country code (e.g. +2348012345678).",
      }))
      return
    }

    setFormState((prev) => ({
      ...prev,
      status: "loading",
      message: "",
    }))

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState.data),
      })

      const result = await response.json()

      if (response.ok) {
        setFormState((prev) => ({
          ...prev,
          status: "success",
          message: result.message,
        }))
      } else {
        setFormState((prev) => ({
          ...prev,
          status: "error",
          message: result.error || "Something went wrong. Please try again.",
        }))
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        status: "error",
        message: "An error occurred. Please try again.",
      }))
    }
  }

  if (formState.status === "success") {
    return (
      <section id="waitlist-form" className="py-16 md:py-24 bg-[#F6F5F1]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">You are on the list.</h2>
            <p className="text-center text-gray-600">
              Thank you for trusting InHerBody. We will send you updates soon.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="waitlist-form" className="py-16 md:py-24 bg-[#F6F5F1]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Join the InHerBody waitlist</h2>
          <p className="text-gray-600 mb-8 text-md">
            Be the first to know when Inherbody community is to launch.
          </p>

          {formState.status === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">{formState.message}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                First name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formState.data.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#655A9C]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.data.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#655A9C]"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-900 mb-2">
                WhatsApp number *
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formState.data.whatsapp}
                onChange={handleInputChange}
                required
                placeholder="+234......"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#655A9C]"
              />
              <p className="mt-1 text-xs text-gray-500">
                Please include your country code.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                What applies to you? (Select all that apply) *
              </label>

              {[
                "PCOS",
                "Endometriosis",
                "Fibroids",
                "Irregular cycles / not sure yet",
                "I am here to support someone",
                "I want to learn and contribute",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    name="condition"
                    value={item}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormState((prev) => {
                        const current = Array.isArray(prev.data.condition)
                          ? prev.data.condition
                          : []

                        return {
                          ...prev,
                          data: {
                            ...prev.data,
                            condition: e.target.checked
                              ? [...current, value]
                              : current.filter((v) => v !== value),
                          },
                        }
                      })
                    }}
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
        

            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-900 mb-2">
                How did you hear about InHerBody?
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={formState.data.source}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#655A9C]"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consentGiven"
                name="consentGiven"
                checked={formState.data.consentGiven}
                onChange={handleInputChange}
                required
                className="mt-1 w-4 h-4 rounded border border-gray-300 focus:ring-2 focus:ring-[#655A9C]"
              />
              <label htmlFor="consentGiven" className="text-sm text-gray-700">
                I agree to receive updates from InHerBody and understand I can opt out at any time. *
              </label>
            </div>

            <button
              type="submit"
              disabled={formState.status === "loading"}
              className="w-full px-6 py-3 bg-[#655A9C] text-white rounded font-medium hover:bg-[#544890] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#655A9C] focus:ring-offset-2 transition-colors"
            >
              {formState.status === "loading" ? "Joining..." : "Join the waitlist"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
