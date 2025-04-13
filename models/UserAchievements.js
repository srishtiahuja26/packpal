import mongoose from "mongoose";

const UserAchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trips" },
  achievementId: { type: mongoose.Schema.Types.ObjectId, ref: "Achievements" },
  dateAchieved: Date,
  claimed: Boolean,
});

export default mongoose.models.UserAchievements || mongoose.model("UserAchievements", UserAchievementSchema);