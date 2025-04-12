// app/api/trips/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Trips from '@/models/Trips';

// GET upcoming trips

export async function GET(req) {
    await dbConnect();
  
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Missing userId' }, { status: 400 });
    }
  
    try {
      const today = new Date();
  
      const trips = await Trips.find({
        startDate: { $gte: today },
        $or: [
          { owner: userId },
          { 'members.user': userId }
        ]
      }).sort({ startDate: 1 });
  
      return NextResponse.json({ success: true, trips });
    } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }
  }
  

// POST new trip
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const newTrip = await Trips.create(body);

    return NextResponse.json({ success: true, trip: newTrip });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
