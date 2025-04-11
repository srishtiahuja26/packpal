import mongoose from 'mongoose';

const inviteSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  email: String,
  role: { type: String, enum: ['Admin', 'Member', 'Viewer'], default: 'Member' },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Invite || mongoose.model('Invite', inviteSchema);
