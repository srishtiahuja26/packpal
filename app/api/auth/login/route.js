import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Users from '@/models/Users';

export async function POST(req) {
  const { email, password } = await req.json();
  try{
    
    await dbConnect();
  
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  
    if (user.password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
  
    return NextResponse.json({ success: true, user });
  }catch(e){
    console.error('Error in login:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}