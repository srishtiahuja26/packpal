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
  if (!name || !category ||  !tripId) {
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
      assignedTo: assignedTo ? assignedTo : null,
      userRole : userRole ? userRole : "Member",
      tripId,
    });

    
    const response = await Trips.updateOne(
      { _id: tripId },
      {
        $addToSet: {
          items: newItem._id,
          members: { user: assignedTo ? assignedTo : null, role: userRole ? userRole : "Member" },
        },
      },
      { upsert: true }
    );
    console.log("Updated trip with new item:", response);
    await newItem.save();
    // await response.save();
    // Return success response
    return NextResponse.json({ success: true, data: newItem ,response});
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
