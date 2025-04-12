// pages/api/items/update-status.js
import dbConnect from "@/lib/dbConnect";
import Items from "@/models/Items";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  await dbConnect();

  const body = await req.json();
  const { itemId, status } = body;

  if (!itemId || !status) {
    return NextResponse.json({ message: "Missing itemId or status" }, { status: 400 });
  }

  try {
    const item = await Items.findByIdAndUpdate(
      itemId,
      { status },
      { new: true }
    );

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error("Error updating task status:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
