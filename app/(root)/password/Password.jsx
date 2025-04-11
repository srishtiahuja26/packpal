"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Mountain, Lock, User } from "lucide-react"

export default function Password() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) return alert("Missing email!")
    if (!username || !password || !confirmPassword) {
      return alert("Please fill all fields")
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match")
    }
    const res = await fetch("/api/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })

    const data = await res.json()
    if (data.success) {
      alert('Account created successfully!');
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } else {
      alert(data.message || "Failed to create account.")
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-cover bg-center"
      style={{
        backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=1080&width=1920)",
        
      }}
    >
      <div className="w-full max-w-md px-6 py-8">
        <div className="flex items-center justify-center mb-6">
          <Mountain className="h-8 w-8 text-white mr-2" />
          <h1 className="text-2xl font-bold text-white">BackpackBuddy</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
        >
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Your Adventure Awaits</h2>
          <p className="text-gray-300 mb-6 text-center text-sm">Set up your account to start exploring</p>

          <div className="space-y-5">
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-200">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 pl-10 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-200">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-200">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 pl-10 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center group"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
