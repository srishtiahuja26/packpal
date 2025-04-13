import dbConnect from '@/lib/dbConnect';
import Users from '@/models/Users';
import Items from '@/models/Items';
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  const { userId } = await req.json();

  try {
    // const user = await Users.findById(userId);
    // if (!user || !user.trips) {
    //   return NextResponse.json({ message: 'User or trips not found' });
    // }

    // const tripIds = user.trips; // Array of ObjectIds or strings

    const items = await Items.find({
      assignedTo: userId
    });

    console.log("Filtered Items:", items);

    const grouped = items.reduce((acc, item) => {
      const status = (item.status || 'unknown').toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      total: items.length,
      grouped,
    });
  } catch (error) {
    console.error('API /chart error:', error);
    return NextResponse.json({ message: 'Server error' });
  }
}
