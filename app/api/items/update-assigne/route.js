// pages/api/items/update-assigne.js
import dbConnect from "@/lib/dbConnect";
import Items from "@/models/Items";
import { NextResponse } from 'next/server';
export async function PATCH(req) {
  await dbConnect();


    const { itemId, assignedTo } = await req.json();
    
    if (!itemId || !assignedTo) {
      return NextResponse.json({ message: "Missing itemId or assignedTo" });
    }

    try {
      const item = await Items.findByIdAndUpdate(
        itemId,
        { assignedTo },
        { new: true }
      ).populate("assignedTo");

      if (!item) {
        return NextResponse.json({ message: "Item not found" });
      }

      return NextResponse.json({ item });
    } catch (error) {
      console.error("Error updating assignee:", error);
      return NextResponse.json({ message: "Server error" });
    }
  
}
