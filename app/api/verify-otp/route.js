import { NextResponse } from 'next/server';
import Otp from '@/models/Otp';
import dbConnect from '@/lib/dbConnect';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, otp } = await req.json();
    console.log("OTP verification request:", { email, otp });
    const record = await Otp.findOneAndDelete({ email, otp });
    if (!record) {
      console.log("Invalid OTP or OTP already used:", { email, otp });
      return NextResponse.json({ success: false, message: 'Invalid OTP' });
    }

    // OPTIONAL: delete OTP after verification
    await Otp.deleteOne({ _id: record._id });
    console.log("OTP verified successfully:", { email, otp });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ success: false, message: 'Something went wrong' });
  }
}
