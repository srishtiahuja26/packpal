'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VerifyOtpForm() {
  const router = useRouter();
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
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');

      alert("Success! OTP verified.");
      router.push('/dashboard');
    } catch (err) {
      console.error('Error:', err.message);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1E1E] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl animate-float1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl animate-float2"></div>
      </div>

      {/* Main card with glass morphism effect */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-[#2D2D2D]/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-[#3A3A3A]/50 hover:border-[#444444]/70 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 z-10 transform hover:-translate-y-1"
      >
        {/* Glowing top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-70 rounded-t-2xl"></div>

        <h2 className="text-3xl font-bold mb-3 text-white bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
          OTP Authentication
        </h2>
        <p className="text-gray-300 mb-6">Enter the 6-digit OTP sent to your email.</p>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-2xl text-center bg-[#2A2A2A] text-white border-2 border-[#3A3A3A] hover:border-[#444444] focus:border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/30 placeholder:text-gray-500 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-teal-500/10 transform hover:scale-105 focus:scale-105"
              maxLength={1}
              required
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/20 flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
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
            'Verify & Login'
          )}
        </button>

        {/* Footer note with subtle animation */}
        <p className="text-gray-400 text-sm mt-6 animate-pulse">Security is our top priority</p>
      </form>

      {/* Add custom animations to your globals.css */}
      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(-2deg); }
        }
        .animate-float1 { animation: float1 15s ease-in-out infinite; }
        .animate-float2 { animation: float2 18s ease-in-out infinite; }
      `}</style>
    </div>
  );
}