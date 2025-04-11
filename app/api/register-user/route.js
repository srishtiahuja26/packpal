import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/Users';

export async function POST(req) {
  try {
    await dbConnect();
    console.log("donee")
    const { email, username, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' });
    }

    // Save to DB
    const newUser = new User({ email, username, password });
    console.log(newUser) // You can hash password here
    await newUser.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' });
  }
}
