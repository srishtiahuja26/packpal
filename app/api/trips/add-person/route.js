// File: /pages/api/trips/add-person.js
import dbConnect from "@/lib/dbConnect";
import Trips from "@/models/Trips";

export async function POST(req, res) {
  await dbConnect();


    const { tripId, userId, role } = req.body;

    if (!tripId || !userId || !role) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
      const trip = await Trips.findById(tripId);
      if (!trip) {
        return res.status(404).json({ success: false, message: "Trip not found" });
      }

      const isAlreadyMember = trip.members.some(
        (m) => m.user.toString() === userId.toString()
      );
      if (isAlreadyMember) {
        return res.status(409).json({ success: false, message: "User already a member" });
      }

      trip.members.push({ user: userId, role });
      await trip.save();

      return res.status(200).json({ success: true, message: "Member added", trip });
    } catch (error) {
      console.error("Error adding member:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  

}
