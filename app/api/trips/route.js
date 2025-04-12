// app/api/trips/route.js
import dbConnect from '@/lib/dbConnect';
import Trip from '@/models/Trips';

export async function GET() {
  try {
    await dbConnect();

    const trips = await Trip.find({});
    console.log(' Trips:', trips); //  Print to server console

    return Response.json({
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error(' Error fetching trips:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to fetch trips',
    }), {
      status: 500,
    });
  }
}
