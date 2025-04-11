'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return alert('Enter OTP');

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, email }),
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/password?email=${email}`);
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md text-center tracking-widest text-lg"
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
  );
}
