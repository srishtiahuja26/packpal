import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['Owner', 'Admin', 'Member', 'Viewer'], default: 'Member' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('Users', userSchema);
