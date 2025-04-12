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
    <div className="flex items-center justify-center min-h-screen bg-[#2F373D]">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl shadow-lg w-full max-w-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 animate-slide-up bg-[#4E545C]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>
        
        <div className="relative mb-6 group">
          <label className="block mb-2 text-base font-medium text-white transition-transform duration-200 group-focus-within:-translate-y-1 group-focus-within:scale-95">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-all duration-200 placeholder:grey-400 bg-white/90"
            placeholder="you@example.com"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4C9BE] text-black py-3 rounded-md hover:bg-[#c0b5a9] hover:scale-105 hover:ring-2 hover:ring-[#D4C9BE]/50 hover:ring-offset-2 active:scale-95 transition-all duration-300 text-base"
        >
          Proceed to Send OTP
        </button>
      </form>
    </div>
  );
}