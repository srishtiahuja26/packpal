import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Items from '@/models/Items';
import Users from '@/models/Users'; // Assuming you're using this to fetch usernames
import mongoose from 'mongoose';

export async function GET(req) {
  const url = new URL(req.url);
  const tripId = url.pathname.split('/').pop(); // gets the [tripId] from the URL

  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return NextResponse.json({ error: 'Invalid trip ID' }, { status: 400 });
  }

  try {
    const items = await Items.find({ tripId });

    if (!items) {
      return NextResponse.json({ error: 'No items found' }, { status: 404 });
    }

    // Collect all unique userIds from assignedTo fields
    const allUserIds = [...new Set(items.map(item => item.assignedTo?.toString()))];

    // Fetch usernames for those userIds
    const usersData = await Users.find(
      { _id: { $in: allUserIds } },
      '_id username'
    );

    const userMap = usersData.reduce((acc, user) => {
      acc[user._id.toString()] = user.username;
      return acc;
    }, {});

    // Attach usernames to each item
    const itemsWithUsers = items.map(item => ({
      ...item.toObject(),
      assignedTo: {
        id: item.assignedTo,
        username: userMap[item.assignedTo?.toString()] || 'Unknown'
      }
    }));

    return NextResponse.json({ items: itemsWithUsers }, { status: 200 });

  } catch (err) {
    console.error('Fetch error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
