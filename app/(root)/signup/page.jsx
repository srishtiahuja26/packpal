'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email");
    
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      // Proceed to OTP verification page
      alert("Successsss! OTP sent to your email. Please check your inbox.");
      router.push(`/verifyotp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Error:', err.message);
      alert(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleSubmit} className="bg-[#123458] p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h2>
        
        <label className="block mb-2 text-sm font-medium text-white">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
          placeholder="you@example.com"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#D4C9BE] text-black py-2 rounded-md hover:bg-[#c0b5a9] transition"
        >
          Proceed to Send OTP
        </button>
      </form>
    </div>
  );
}