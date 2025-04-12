import { Suspense } from 'react';
import VerifyOtpForm from './verifyOtp';
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  )
}