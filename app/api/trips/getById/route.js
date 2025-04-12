import dbConnect from '@/lib/dbConnect';
import Trips from '@/models/Trips';
import { NextResponse } from 'next/server';
export async function GET(req) {
  const {  query } = req;

  await dbConnect();

 

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'Trip ID is required' });
  }

  try {
    const trip = await Trips.findById(id);

    if (!trip) {
      return NextResponse.json({ success: false, message: 'Trip not found' });
    }

    return NextResponse.json({ success: true, data: trip });
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    return NextResponse.json({ success: false, message: 'Server error' });
  }
}
