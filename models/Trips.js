import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  name: String,
  category: String,
  type: String,
  startDate: Date,
  endDate: Date,
  destination : String,
  items : Array,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      role: { type: String, enum: ['Admin', 'Member', 'Viewer'], default: 'Member' }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Trips || mongoose.model('Trips', tripSchema);
