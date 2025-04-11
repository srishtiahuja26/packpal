import { NextResponse } from 'next/server';
import Otp from '@/models/Otp';
import dbConnect from '@/lib/dbConnect';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, otp } = await req.json();

    const record = await Otp.findOneAndDelete({ email, otp });
    if (!record) {
      return NextResponse.json({ success: false, message: 'Invalid OTP' });
    }

    // OPTIONAL: delete OTP after verification
    await Otp.deleteOne({ _id: record._id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ success: false, message: 'Something went wrong' });
  }
}
