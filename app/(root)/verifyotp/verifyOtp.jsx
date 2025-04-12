'use client';

import { useSearchParams,useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return alert("Please enter a 6-digit OTP");

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode,email }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/password?email=${email}`);
      } else {
        alert('Invalid OTP');
      }
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
          OTP Authentication
        </h2>
        <p className="text-[#CBD5E1] mb-6">Enter the 6-digit OTP sent to your email.</p>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-2xl font-medium text-center bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-white border-2 border-[#334155] hover:border-[#6366F1] focus:border-[#818CF8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#6366F1]/20 transform hover:scale-105 focus:scale-105"
              maxLength={1}
              required
            />
          ))}
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
              Verifying...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Verify & Login
            </>
          )}
        </button>

        {/* Footer note with subtle gradient animation */}
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#64748B] via-[#94A3B8] to-[#64748B] text-sm mt-6 animate-text-pulse">
          Security is our top priority
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