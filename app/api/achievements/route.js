import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import Achievements from "@/models/Achievements";

export async function GET() {
  await dbConnect();
  try {
    const achievements = await Achievements.find({});
    console.log("Achievements fetched:", achievements);
    return NextResponse.json({ success: true, achievements });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch achievements", error });
  }
}