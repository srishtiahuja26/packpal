import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/helper';
import dbConnect from '@/lib/dbConnect';
import Otp from '@/models/Otp';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

  await dbConnect();

  var digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

  try {
    const VERIFICATION_CODE_TEMPLATE = process.env.VERIFICATION_CODE_TEMPLATE!;
    await sendEmail(email, VERIFICATION_CODE_TEMPLATE, { otp });

    await new Otp({ email, otp }).save();

    return NextResponse.json({ success: true, otp });
  } catch (err) {
    console.error('Send OTP Error:', err);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
