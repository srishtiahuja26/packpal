// app/api/trips/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Trips from "@/models/Trips";
import Users from "@/models/Users";
// GET upcoming trips

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Missing userId" },
      { status: 400 }
    );
  }

  try {
    const today = new Date();

    const trips = await Trips.find({
      startDate: { $gte: today },
      $or: [{ owner: userId }, { "members.user": userId }],
    }).sort({ startDate: 1 });

    return NextResponse.json({ success: true, trips });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// POST new trip
// POST new trip
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // Destructure owner from body
    // const { owner } = body;
    
    if (!body.owner) {
      return NextResponse.json(
        { success: false, message: "Missing owner (userId)" },
        { status: 400 }
      );
    }

    // Step 1: Create the trip
    const newTrip = await Trips.create(body);

    // Step 2: Update the user to include the trip in their 'trips' array

    await Users.findByIdAndUpdate(body.owner, {
      $push: { trips: newTrip._id },
    });
    // Step 3: Return success response
    return NextResponse.json({ success: true, trip: newTrip });
  } catch (error) {
    console.error("Error in trip creation:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
