'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email");
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      alert("Success! OTP sent to your email. Please check your inbox.");
      router.push(`/verifyotp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Error:', err.message);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl animate-float1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-violet-600/20 blur-3xl animate-float2"></div>
      </div>

      {/* Main card with gradient glass morphism effect */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] z-10 transform hover:-translate-y-1.5"
      >
        {/* Glowing gradient top accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-t-2xl"></div>

        <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          Sign Up
        </h2>
        <p className="text-[#CBD5E1] mb-6">Enter your email to receive an OTP</p>

        <div className="relative mb-8 group">
          <label className="block mb-2 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 transition-all duration-200 group-focus-within:-translate-y-1 group-focus-within:scale-95">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-white border-2 border-[#334155] hover:border-[#6366F1] focus:border-[#818CF8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#6366F1]/20 transform hover:scale-[1.02] focus:scale-[1.02]"
            placeholder="you@example.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white py-3.5 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30 flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-90' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending OTP...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send OTP
            </>
          )}
        </button>

        {/* Footer note with subtle gradient animation */}
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#64748B] via-[#94A3B8] to-[#64748B] text-sm mt-6 animate-text-pulse">
          We'll send a verification code to your email
        </p>
      </form>

      {/* Custom animations */}
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
    </div>
  );
}