import dbConnect from "@/lib/dbConnect"; // You can write a helper to connect with MongoDB
import Items from "@/models/Items";
import Trips from "@/models/Trips";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  // Connect to MongoDB
  await dbConnect();

  const { name, category, assignedTo, userRole, tripId } = await req.json(); // Use req.body instead of req.json()

  // Validate fields
  if (!name || !category || !assignedTo || !userRole || !tripId) {
    return NextResponse.json({ message: "All fields are required" });
  }
  if (!mongoose.isValidObjectId(tripId)) {
    return NextResponse.json(
      { success: false, message: "Invalid trip ID" },
      { status: 400 }
    );
  }
  try {
    // Create a new item
    const newItem = await Items.create({
      name,
      category,
      assignedTo,
      userRole,
      tripId,
    });

    await newItem.save();
    
    await Trips.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(tripId) },
      {
        $addToSet: {
          items: newItem._id,
          members: { user: new mongoose.Types.ObjectId(assignedTo), role: userRole },
        },
        // Initialize members as an array if it’s null or undefined
        // $setOnInsert: { members: [] },
      },
      { upsert: true, new: true } // Upsert ensures the document exists; new returns updated doc
    );
    // Return success response
    return NextResponse.json({ success: true, data: newItem });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
