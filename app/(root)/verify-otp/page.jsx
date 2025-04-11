// app/(root)/verify-otp/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const VerifyOtp = dynamic(() => import('./VerifyOtp.js'), { ssr: false });

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  );
}
