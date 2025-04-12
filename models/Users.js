import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['Owner', 'Admin', 'Member', 'Viewer'], default: 'Member' },
  createdAt: { type: Date, default: Date.now },
  trips : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trips', default: [] }],
});

export default mongoose.models.Users || mongoose.model('Users', userSchema);
