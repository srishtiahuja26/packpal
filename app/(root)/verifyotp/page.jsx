'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function VerifyOtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Handle OTP input focus and navigation
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

  // Handle backspace to move focus
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return alert("Please enter a 6-digit OTP");

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');

      alert("Success! OTP verified.");
      router.push('/dashboard'); // Adjust redirect as needed
    } catch (err) {
      console.error('Error:', err.message);
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">OTP Authentication</h2>
        <p className="text-gray-600 mb-6">Enter the 6 digit OTP sent to your email.</p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              maxLength={1}
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded-full hover:bg-teal-600 transition mb-4"
        >
          Login
        </button>
      </form>
    </div>
  );
}