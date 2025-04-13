import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  rewardType: String,
  rewardValue: String,
  criteria: Object,
});

export default mongoose.models.Achievements || mongoose.model("Achievements", AchievementSchema);