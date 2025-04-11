import { Suspense } from 'react';
import Password from './Password'; // adjust path if needed

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <Password />
    </Suspense>
  );
}
