import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  name: String,
  category: String,
  type: String,
  startDate: Date,
  endDate: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['Admin', 'Member', 'Viewer'], default: 'Member' }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Trips || mongoose.model('Trips', tripSchema);
