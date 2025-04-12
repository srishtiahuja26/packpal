import dbConnect from '@/lib/dbConnect';
import Trip from '@/models/Trips';
import Users from '@/models/Users'; // <- Import your User model
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Missing userId',
      }, { status: 400 });
    }

    // Find the user and get their trips
    const user = await Users.findById(userId);
    if (!user || !user.trips || user.trips.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Find all trips where _id is in user.trips
    const trips = await Trip.find({ _id: { $in: user.trips } });

    return NextResponse.json({
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch trips',
    }, { status: 500 });
  }
}
