import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String, // hashed
  role: { type: String, enum: ['Owner', 'Admin', 'Member', 'Viewer'], default: 'Member' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('Users', userSchema);
