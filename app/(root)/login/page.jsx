"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Mail, Lock } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if the user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user'); // Assuming you store user data in localStorage
    if (user) {
      router.push('/dashboard'); // Redirect to dashboard if user is already logged in
    }
  }, [router]);

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('user',data.user);
      router.push('/dashboard'); // Redirect if login is successful
    } else {
      setError(data.error || 'Login failed');
    }
    console.log("Login clicked!", email, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl animate-float1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-violet-600/20 blur-3xl animate-float2"></div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] transform hover:-translate-y-1.5">
          {/* Glowing gradient top accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-t-2xl"></div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Welcome Back</h2>
            <p className="text-[#CBD5E1]">Start your next adventure</p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <label className="block mb-2 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 transition-all duration-200 group-focus-within:-translate-y-1 group-focus-within:scale-95">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-10 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-white border-2 border-[#334155] hover:border-[#6366F1] focus:border-[#818CF8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#6366F1]/20 transform hover:scale-[1.02] focus:scale-[1.02]"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block mb-2 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 transition-all duration-200 group-focus-within:-translate-y-1 group-focus-within:scale-95">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-10 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-white border-2 border-[#334155] hover:border-[#6366F1] focus:border-[#818CF8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#6366F1]/20 transform hover:scale-[1.02] focus:scale-[1.02]"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              type="button"
              className="w-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white py-3.5 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30"
            >
              Sign in
            </Button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#334155]"></div>
              </div>
            </div>

            <p className="text-center text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#64748B] via-[#94A3B8] to-[#64748B] animate-text-pulse">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-[#818CF8] hover:text-[#A5B4FC] transition-colors">
                Sign up now
              </a>
            </p>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -20px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, 25px) rotate(-3deg); }
        }
        @keyframes text-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-float1 { animation: float1 18s ease-in-out infinite; }
        .animate-float2 { animation: float2 20s ease-in-out infinite; }
        .animate-text-pulse { animation: text-pulse 3s ease-in-out infinite; }
      `}</style>
    </main>
  );
}