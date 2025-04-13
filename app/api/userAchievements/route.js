import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import UserAchievements from "@/models/UserAchievements";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { userId, tripId, achievementId } = body;

    // Check if already claimed
    const alreadyClaimed = await UserAchievements.findOne({
      userId,
      tripId,
      achievementId
    });

    if (alreadyClaimed) {
      return NextResponse.json({ success: false, message: "Achievement already claimed." }, { status: 409 });
    }

    const newEntry = await UserAchievements.create({
      userId,
      tripId,
      achievementId,
      dateAchieved: new Date(),
      claimed: true
    });

    return NextResponse.json({ success: true, data: newEntry }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
