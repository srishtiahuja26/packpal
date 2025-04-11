'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyOtp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Email is missing!");
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return alert("Please enter a valid 6-digit OTP");
    }

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (data.success) {
      alert("OTP Verified!");
      router.push('/password'); // redirect after verification
    } else {
      alert("Invalid OTP or expired.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Enter 6-digit OTP sent to <span className="font-semibold">{email}</span>
        </label>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="123456"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}
