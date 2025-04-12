// app/api/users/route.js (Next.js 13+ App Router)

import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import Users from "@/models/Users";

export async function GET() {
  try {
    await dbConnect();
    
    const users = await Users.find({}, "_id username"); // Fetch only _id and username
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch users" }, { status: 500 });
  }
}
